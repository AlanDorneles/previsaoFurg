import { getRadarInformation } from "../services/redemet.js";
import { DataINMETAPI } from "../services/inmet.js";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Pane,
  ImageOverlay,
  /*Rectangle,*/ Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MenuMap } from "../components/menuMap/menuMap.jsx";
import { Player } from "../components/player/player.jsx";
import { HourScopeProvider, useHourScope } from "../contexts/hourAnimation.jsx";
import { getImages } from "../services/images.js";
import { customMarkerIcon, iconStation } from "../components/marker/marker.jsx";
import { circleOptions } from "../constants/constants.js";
import { FilterTypeRadar } from "../components/filterTypeRadar/filterTypeRadar.jsx";
import { UseRadarIsChecked } from "../contexts/radarIsChecked.jsx";
import { UsePreviousAndNextImage } from "../contexts/previousAndNextImage.jsx";
import { useStationsVisible } from "../contexts/radarFilter.jsx";
import { useCodeStation } from "../contexts/codeStation.jsx";
import { Card } from "../components/card/Card.jsx";
import { useFilterTypeRadarContext } from "../contexts/typeRadar.jsx";
import { MdClose } from "react-icons/md";
import { GraphicPressure } from "../components/chart/chartPressure.jsx";
import { MenuStation } from "../components/menuStation/MenuStation.jsx";


export default function Radar() {
  const [morroDaIgreja, setMorroDaIgreja] = useState("");
  const [cangucu, setCangucu] = useState("");
  const [santiago, setSantiago] = useState("");
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
  const { cangucuChecked, morroDaIgrejaChecked, santiagoChecked } =
    UseRadarIsChecked();
  const { indexImage, handleNextImage, handlePreviousImage } =
    UsePreviousAndNextImage();
  const { getHourScope } = useHourScope();
  const { stationsVisible } = useStationsVisible();
  const { codeStation, setCodeStation } = useCodeStation();
  const { typeRadar } = useFilterTypeRadarContext();
  const [clicked, setClicked] = useState(false)
  const [dataINMET, setDataINMET] = useState([])

  const handlerSrcFunc = () => {
    if (handlerSrc === false) {
      setHandlerSrc(true);
    } else {
      setHandlerSrc(false);
    }
  };
  console.log(typeRadar);

  const boundsMorroDaIgreja = [
    [-24.5, -53.5],
    [-31.7, -45.5],
  ];
  const boundsCangucu = [
    [-27.8, -57],
    [-35, -48.5],
  ];

  const boundsSantiago = [
    [-25.6, -59.1],
    [-32.8, -50.8],
  ];

  useEffect(() => {

        console.log('Estado "clicked" foi alterado:', clicked);
      }, [clicked]);


 const handleClickModal =  () => {
        setClicked(true)
        console.log(clicked)

  }

  const handleCloseModal = () => {
        setClicked(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const radarInformation = await getRadarInformation();
        setMorroDaIgreja(radarInformation.morroDaIgreja);
        setCangucu(radarInformation.cangucu);
        setSantiago(radarInformation.santiago);
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataINMET = await DataINMETAPI()
        setDataINMET(dataINMET)
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, []);

  const playImages = async () => {
    const images = await getImages();
    setImages(images);
    console.log(images);

    let currentIndex = 0; // Use o índice atual de imagem como ponto de partida
    handlerSrcFunc();

    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentIndex);
      currentIndex = (currentIndex + 1) % images.length;
      if (currentIndex === currentImageIndex) {
        clearInterval(intervalId);
      }
    }, 400);
  };

  const pauseGif = () => {
    setHandlerSrc(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    handleNextImage(count);
    setCount(count + 1);

    if (count >= images.length - 2) {
      setCount(0);
    }
    localStorage.setItem("imageId", count);
    setCurrentImageIndex(count); //GATILHO PARA MUDANÇA DE IMAGEM
  };

  const previousImage = () => {
    handlePreviousImage(count);
    if (count <= 0) {
      setCount(getHourScope);
    } else {
      setCount(count - 1);
      setCurrentImageIndex(count - 1); ///GATILHO PARA MUDANÇA DE IMAGEM
      console.log("OK");
    }
  };

  const handleSelectImage = () => {
    setCurrentImageIndex(indexImage + 1);
  };

  const handleClickMarker = (event) => {
    const { id } = event.target.options;
    console.log(`Clicou no Marker com id: ${id}`);
    setCodeStation(id);
    console.log(codeStation);
  };
  return (
    <>
      <HourScopeProvider>
        <MenuMap selectImage={handleSelectImage} />
      </HourScopeProvider>
      <Player
        playGif={playImages}
        onClick={handlerSrcFunc}
        pauseGif={pauseGif}
        nextImage={nextImage}
        previousImage={previousImage}
      />
      <MapContainer
        center={[-28.128373, -49.471816]}
        zoom={5.5}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "90vh" }}
      >
        {/*<Rectangle bounds={boundsCangucu} pathOptions={{ color: 'red' }}/>*/}
        {cangucuChecked ? (
          <Pane style={{ zIndex: 500 }}>
            <Circle
              center={[-31.404, -52.701644]}
              pathOptions={circleOptions}
              radius={400000}
              border={false}
            />
          </Pane>
        ) : null}
        {/*<Rectangle bounds={boundsMorroDaIgreja} pathOptions={{ color: 'black' }}/>*/}
        {morroDaIgrejaChecked ? (
          <Pane style={{ zIndex: 500 }}>
            <Circle
              center={[-28.128373, -49.471816]}
              pathOptions={circleOptions}
              radius={400000}
              border={false}
            />
          </Pane>
        ) : null}
        {/*<Rectangle bounds={boundsSantiago} pathOptions={{ color: 'red' }}/>*/}
        {santiagoChecked ? (
          <Pane style={{ zIndex: 500 }}>
            <Circle
              center={[-29.225213, -54.930257]}
              pathOptions={circleOptions}
              radius={400000}
              border={false}
            />
          </Pane>
        ) : null}

        {stationsVisible == false ? (
          <>
            <Marker
              position={[-33.74, -53.37]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>{
                  handleClickMarker({ target: { options: { id: "83998" } } }),handleClickModal()
              }}}
            ></Marker>{" "}
            {/* CHUÍ */}
            <Marker
              position={[-29.7, -53.68]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>{
                  handleClickMarker({ target: { options: { id: "V0633" } } }),handleClickModal()
              }}}
            ></Marker>{" "}
            {/* SANTA MARIA */}
            <Marker
              position={[-29.84, -57.08]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A809" } } }),
              }}
            ></Marker>{" "}
            {/*URUGUAIANA */}
            <Marker
              position={[-32.08, -52.17]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A802" } } }),
              }}
            ></Marker>
            {/* RIO GRANDE */}
            <Marker
              position={[-32.53, -53.38]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A836" } } }),
              }}
            >
              <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
                972bar
              </Tooltip>
            </Marker>
            {/* JAGUARÃO */}
            <Marker
              position={[-31.96, -53.49]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0615" } } }),
              }}
            ></Marker>
            {/* HERVAL */}
            <Marker
              position={[-31.8, -52.51]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0628" } } }),
              }}
            ></Marker>
            {/* PELOTAS */}
            <Marker
              position={[-31.67, -53.1]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0630" } } }),
              }}
            ></Marker>
            {/* PIRATINI */}
            <Marker
              position={[-31.5, -53.51]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0629" } } }),
              }}
            ></Marker>
            {/* PINHEIRO MACHADO */}
            <Marker
              position={[-31.39, -53.93]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0616" } } }),
              }}
            ></Marker>
            {/* HULHA NEGRA */}
            <Marker
              position={[-31.35, -54.01]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A827" } } }),
              }}
            ></Marker>
            {/* BAGÉ*/}
            <Marker
              position={[-31.0, -54.62]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A881" } } }),
              }}
            ></Marker>
            {/* DOM PEDRITO*/}
            <Marker
              position={[-30.75, -55.4]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A804" } } }),
              }}
            ></Marker>
            {/* SANTANA DO LIVRAMENTO*/}
            <Marker
              position={[-29.16, -56.55]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0618" } } }),
              }}
            ></Marker>
            {/* ITAQUI*/}
            <Marker
              position={[-29.21, -56.35]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0619" } } }),
              }}
            ></Marker>
            {/* ITAQUI VMAER*/}
            <Marker
              position={[-29.13, -56.02]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0623" } } }),
              }}
            ></Marker>
            {/* MACAMBARÁ*/}
            <Marker
              position={[-29.71, -55.53]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A826" } } }),
              }}
            ></Marker>
            {/* ALEGRETE*/}
            <Marker
              position={[-30.26, -54.84]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0632" } } }),
              }}
            ></Marker>
            {/* ROSÁRIO DO SUL*/}
            <Marker
              position={[-30.34, -54.31]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A832" } } }),
              }}
            ></Marker>
            {/* SÃO GABRIEL*/}
            <Marker
              position={[-30.34, -54.26]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0638" } } }),
              }}
            ></Marker>
            {/* SÃO GABRIEL*/}
            <Marker
              position={[-30.72, -53.96]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0622" } } }),
              }}
            ></Marker>
            {/* LAVRAS DO SUL*/}
            <Marker
              position={[-30.9, -53.43]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0604" } } }),
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL (MINAS DO CAMAQUÃ)*/}
            <Marker
              position={[-30.94, -52.74]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0608" } } }),
              }}
            ></Marker>
            {/* CANGUÇU OLIVAL CAPOLIVO*/}
            <Marker
              position={[-31.4, -52.7]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A811" } } }),
              }}
            ></Marker>
            {/* CANGUÇU*/}
            <Marker
              position={[-31.36, -52.27]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0639" } } }),
              }}
            ></Marker>
            {/* SÃO LOURENÇO DO SUL*/}
            <Marker
              position={[-30.81, -51.83]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A838" } } }),
              }}
            ></Marker>
            {/* CAMAQUÃ*/}
            <Marker
              position={[-30.57, -51.53]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0601" } } }),
              }}
            ></Marker>
            {/* BARRA DO RIBEIRO*/}
            <Marker
              position={[-30.55, -52.41]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0612" } } }),
              }}
            ></Marker>
            {/* ENCRUZILHADA DO SUL*/}
            <Marker
              position={[-30.55, -53.47]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A812" } } }),
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL*/}
            <Marker
              position={[-30.41, -53.45]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0603" } } }),
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL (COSTI OLIVOS)*/}
            <Marker
              position={[-30.37, -53.51]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0640" } } }),
              }}
            ></Marker>
            {/* SÃO SEPÉ*/}
            <Marker
              position={[-29.19, -54.89]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A833" } } }),
              }}
            ></Marker>
            {/* SANTIAGO*/}
            <Marker
              position={[-29.48, -54.73]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0620" } } }),
              }}
            ></Marker>
            {/* JAGUARI ( MIRANTE MINUZZI)*/}
            <Marker
              position={[-29.7, -54.69]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A889" } } }),
              }}
            ></Marker>
            {/* SÃO VICENTE DO SUL*/}
            <Marker
              position={[-30.22, -52.94]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0605" } } }),
              }}
            ></Marker>
            {/* CACHOEIRA DO SUL (CAPANE)*/}
            <Marker
              position={[-29.94, -52.78]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0606" } } }),
              }}
            ></Marker>
            {/* CACHOEIRA DO SUL (CASA AZUL)*/}
            <Marker
              position={[-29.87, -52.38]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A813" } } }),
              }}
            ></Marker>
            {/* RIO PARDO*/}
            <Marker
              position={[-30.03, -52.13]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0626" } } }),
              }}
            ></Marker>
            {/* MINAS DO LEÃO*/}
            <Marker
              position={[-29.79, -51.83]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0643" } } }),
              }}
            ></Marker>
            {/* TAQUARI*/}
            <Marker
              position={[-29.72, -51.48]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0627" } } }),
              }}
            ></Marker>
            {/* MONTENEGRO*/}
            <Marker
              position={[-29.55, -52.23]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0645" } } }),
              }}
            ></Marker>
            {/* VENÂNCIO AIRES*/}
            <Marker
              position={[-29.4, -52.99]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0642" } } }),
              }}
            ></Marker>
            {/* SOBRADINHO*/}
            <Marker
              position={[-29.18, -53.69]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0621" } } }),
              }}
            ></Marker>
            {/* JULIO DE CASTILHOS*/}
            <Marker
              position={[-29.09, -53.83]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A886" } } }),
              }}
            ></Marker>
            {/* TUPANCIRETÃ*/}
            <Marker
              position={[-28.69, -54.92]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0602" } } }),
              }}
            ></Marker>
            {/* BOSSOROCA*/}
            <Marker
              position={[-28.42, -54.96]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A852" } } }),
              }}
            ></Marker>
            {/* SÃO LUIZ GONZAGA*/}
            <Marker
              position={[-28.76, -56.05]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0636" } } }),
              }}
            ></Marker>
            {/* SÃO BORJA ( TERRA DO SOL)*/}
            <Marker
              position={[-28.69, -55.96]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0635" } } }),
              }}
            ></Marker>
            {/* SÃO BORJA ( DDPA)*/}
            <Marker
              position={[-28.65, -56.02]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A830" } } }),
              }}
            ></Marker>
            {/* SÃO BORJA */}
            <Marker
              position={[-28.14, -54.76]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0610" } } }),
              }}
            ></Marker>
            {/* CERRO LARGO */}
            <Marker
              position={[-28.27, -54.22]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0634" } } }),
              }}
            ></Marker>
            {/* SANTO ÂNGELO */}
            <Marker
              position={[-28.6, -53.67]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A853" } } }),
              }}
            ></Marker>
            {/* CRUZ ALTA  */}
            <Marker
              position={[-28.65, -53.11]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A883" } } }),
              }}
            ></Marker>
            {/* IBIRUBÁ */}
            <Marker
              position={[-28.86, -52.54]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A837" } } }),
              }}
            ></Marker>
            {/* SOLEDADE */}
            <Marker
              position={[-28.94, -52.05]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0617" } } }),
              }}
            ></Marker>
            {/* ILÓPOLIS(IBRAMATE) */}
            <Marker
              position={[-29.45, -51.82]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A882" } } }),
              }}
            ></Marker>
            {/* TEUTÔNIA */}
            <Marker
              position={[-29.16, -51.53]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A840" } } }),
              }}
            ></Marker>
            {/* BENTO GONÇALVES */}
            <Marker
              position={[-28.89, -51.54]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0646" } } }),
              }}
            ></Marker>
            {/* VERANÓPOLIS */}
            <Marker
              position={[-28.7, -51.87]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A894" } } }),
              }}
            ></Marker>
            {/* SERAFINA CORRÊA */}
            <Marker
              position={[-29.14, -50.99]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0609" } } }),
              }}
            ></Marker>
            {/* CAXIAS DO SUL  */}
            <Marker
              position={[-28.94, -50.61]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0637" } } }),
              }}
            ></Marker>
            {/* SÃO FRANCISCO DE PAULA */}
            <Marker
              position={[-29.37, -50.83]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A879" } } }),
              }}
            ></Marker>
            {/*CANELA  */}
            <Marker
              position={[-29.67, -51.06]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A884" } } }),
              }}
            ></Marker>
            {/* CAMPO BOM  */}
            <Marker
              position={[-29.85, -51.19]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0613" } } }),
              }}
            ></Marker>
            {/* ESTEIO  */}
            <Marker
              position={[-27.74, -54.88]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0631" } } }),
              }}
            ></Marker>
            {/* PORTO VERA CRUZ  */}
            <Marker
              position={[-27.85, -53.79]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A805" } } }),
              }}
            ></Marker>
            {/* SANTO AUGUSTO  */}
            <Marker
              position={[-27.92, -53.32]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A856" } } }),
              }}
            ></Marker>
            {/* PALMEIRAS DAS MISSÕES */}
            <Marker
              position={[-27.86, -53.04]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0641" } } }),
              }}
            ></Marker>
            {/* SARANDI  */}
            <Marker
              position={[-27.4, -53.43]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A854" } } }),
              }}
            ></Marker>
            {/* FREDERICO WESTPHALEN */}
            <Marker
              position={[-27.89, -52.21]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0614" } } }),
              }}
            ></Marker>
            {/* GETULIO VARGAS  */}
            <Marker
              position={[-28.45, -50.95]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0644" } } }),
              }}
            ></Marker>
            {/* VACARIA  */}
            <Marker
              position={[-28.51, -50.88]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A880" } } }),
              }}
            ></Marker>
            {/* VACARIA  */}
            <Marker
              position={[-29.95, -51.12]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0607" } } }),
              }}
            ></Marker>
            {/* CACHOEIRINHA  */}
            <Marker
              position={[-30.03, -51.02]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0647" } } }),
              }}
            ></Marker>
            {/* VIAMÃO  */}
            <Marker
              position={[-30.19, -51.18]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "B807" } } }),
              }}
            ></Marker>
            {/* POA - BELEM NOVO  */}
            <Marker
              position={[-28.75, -50.06]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A829" } } }),
              }}
            ></Marker>
            {/* SÃO JOSÉ DOS AUSENTES */}
            <Marker
              position={[-29.05, -50.15]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A897" } } }),
              }}
            ></Marker>
            {/* CAMBARA DO SUL */}
            <Marker
              position={[-29.35, -49.73]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A808" } } }),
              }}
            ></Marker>
            {/* TORRES */}
            <Marker
              position={[-29.66, -50.21]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "V0625" } } }),
              }}
            ></Marker>
            {/* MAQUINÉ */}
            <Marker
              position={[-30.01, -50.14]}
              icon={iconStation}
              className="iconStation"
              eventHandlers={{
                click: () =>
                  handleClickMarker({ target: { options: { id: "A834" } } }),
              }}
            ></Marker>
            {/* TRAMANDAÍ */}
          </>
        ) : (
          ""
        )}
        <Marker
          position={[-33.5257, -53.3711]}
          icon={customMarkerIcon}
        ></Marker>
        <Marker position={[-32.035, -52.0986]} icon={customMarkerIcon}></Marker>
        <Marker
          position={[-31.3662, -51.9716]}
          icon={customMarkerIcon}
        ></Marker>
        <Marker
          position={[-29.8262, -50.5179]}
          icon={customMarkerIcon}
        ></Marker>
        {cangucuChecked ? (
          <>
            {cangucu.path && (
              <ImageOverlay
                bounds={boundsCangucu}
                url={
                  handlerSrc ? images[currentImageIndex].cangucu : cangucu.path
                }
              />
            )}{" "}
          </>
        ) : null}

        {morroDaIgrejaChecked ? (
          <>
            {morroDaIgreja.path && (
              <ImageOverlay
                bounds={boundsMorroDaIgreja}
                url={
                  handlerSrc
                    ? images[currentImageIndex].morroDaIgreja
                    : morroDaIgreja.path
                }
              />
            )}
          </>
        ) : null}

        {santiagoChecked ? (
          <>
            {santiago.path && (
              <ImageOverlay
                bounds={boundsSantiago}
                url={
                  handlerSrc
                    ? images[currentImageIndex].santiago
                    : santiago.path
                }
              />
            )}{" "}
          </>
        ) : null}

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>{" "}
      <FilterTypeRadar />
      {clicked &&(
      <div style={{ display: "flex", flexDirection: "row", height: "100%", zIndex:'800', position: 'relative'}}>
        <div style={{width:'30%'}}>
          <Card style={{ flex: "0 0 auto", marginRight: '10px' }} />
        </div>
        <div style={{width:'65%', height:'100%'}}>
          <MenuStation/>

          <GraphicPressure style={{width:'100%'}}/>
        </div>
        <div>
          <button
            className="is-danger"
            onClick={handleCloseModal}
            style={{ height: '40px', width: '40px', position:'relative' }}
          >
            <MdClose />
          </button>
        </div>
    </div>)}
    </>
  );
}
