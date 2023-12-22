import { getRadarInformation } from "../services/redemet.js";
import { DataINMET } from "../services/inmet.js";
import { useEffect, useState} from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Pane,
  ImageOverlay ,/*Rectangle,*/Marker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MenuMap } from "../components/menuMap/menuMap.jsx";
import { Player } from "../components/player/player.jsx";
import { HourScopeProvider, useHourScope } from "../contexts/hourAnimation.jsx";
import { getImages } from "../services/images.js";
import { customMarkerIcon,iconStation} from '../components/marker/marker.jsx';
import { circleOptions } from "../constants/constants.js";
import { FilterTypeRadar } from "../components/filterTypeRadar/filterTypeRadar.jsx";
import { UseRadarIsChecked } from '../contexts/radarIsChecked.jsx'
import { UsePreviousAndNextImage } from "../contexts/previousAndNextImage.jsx";

export default function Radar() {
  const [morroDaIgreja, setMorroDaIgreja] = useState("");
  const [cangucu, setCangucu] = useState("");
  const [santiago, setSantiago] = useState("")
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0)
  const {cangucuChecked,morroDaIgrejaChecked, santiagoChecked} = UseRadarIsChecked()
  const {indexImage,handleNextImage,handlePreviousImage} = UsePreviousAndNextImage()
  const {getHourScope} = useHourScope()

  const handlerSrcFunc = () => {
    if (handlerSrc === false) {
      setHandlerSrc(true);
    } else {
      setHandlerSrc(false);
    }
  };

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
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const radarInformation = await getRadarInformation();
        setMorroDaIgreja(radarInformation.morroDaIgreja);
        setCangucu(radarInformation.cangucu);
        setSantiago(radarInformation.santiago)
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const directions = await DataINMET();
        console.log(directions.windDireciton)
        
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
    setCurrentImageIndex(0)
  };

  const nextImage = () => {
    handleNextImage(count)
    setCount(count+1)
    
    if(count >= images.length-2){
      setCount(0)
    }
    localStorage.setItem('imageId',count)
    setCurrentImageIndex(count) //GATILHO PARA MUDANÇA DE IMAGEM

  }
  

  const previousImage = () => {
    handlePreviousImage(count)
    if(count <= 0){
      setCount(getHourScope)
    }else{
      setCount(count-1)
      setCurrentImageIndex(count-1) ///GATILHO PARA MUDANÇA DE IMAGEM
      console.log('OK')
  }
  }

  const handleSelectImage = () => {
    setCurrentImageIndex(indexImage + 1);
  };

  return (
   
        <>
          <HourScopeProvider>
            <MenuMap selectImage={handleSelectImage}
             />
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
            {cangucuChecked ?
            <Pane style={{ zIndex: 500 }}>
              <Circle
                center={[-31.404, -52.701644]}
                pathOptions={circleOptions}
                radius={400000}
                border={false}
              />
            
        
            </Pane>:null}
 {/*<Rectangle bounds={boundsMorroDaIgreja} pathOptions={{ color: 'black' }}/>*/}
            {morroDaIgrejaChecked ?
            <Pane style={{ zIndex: 500}}>
              <Circle
                center={[-28.128373, -49.471816]}
                pathOptions={circleOptions}
                radius={400000}
                border={false}
              />
            </Pane> : null}
            {/*<Rectangle bounds={boundsSantiago} pathOptions={{ color: 'red' }}/>*/}
            {santiagoChecked ?
            <Pane style={{ zIndex: 500 }}>
              <Circle
                center={[-29.225213, -54.930257]}
                pathOptions={circleOptions}
                radius={400000}
                border={false}
              />
        
            </Pane> : null}
            <Marker position={[ -33.5257, -53.3711]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -32.0350, -52.0986]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -31.3662, -51.9716]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -29.8262, -50.5179]} icon={customMarkerIcon}></Marker>
            <Marker position={[-32.07888888,-52.16777777]} icon={iconStation}></Marker>
            <Marker position={[-31.8025,-52.40722222]} icon={iconStation}></Marker>
            <Marker position={[-30.807953,-51.83424]} icon={iconStation}></Marker>
            <Marker position={[-30.1861111,-51.17805554]} icon={iconStation}></Marker>
            <Marker position={[-30.05361111,-51.17472221]} icon={iconStation}></Marker>
            <Marker position={[-33.74222221,-53.37222221]} icon={iconStation}></Marker>
            <Marker position={[-31.24833333,-50.90638888]} icon={iconStation}></Marker>
            {cangucuChecked ? 
            <>
              {cangucu.path && (
              <ImageOverlay
                bounds={boundsCangucu}
                url={
                  handlerSrc ? images[currentImageIndex].cangucu : cangucu.path
                }

              />
            )} </>: null}

            {morroDaIgrejaChecked ?
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
            </> : null 
          }

{santiagoChecked ?
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
            )}
            </>: null
          }


            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>{" "}
          <FilterTypeRadar/>
        </>
  );
}
