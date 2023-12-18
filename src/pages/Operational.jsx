import { getRadarInformation } from "../services/redemet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Pane,
  ImageOverlay /*Rectangle*/,Marker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Tabs } from "../components/tabs/tabs";
import { MenuMap } from "../components/menuMap/menuMap.jsx";
import { Player } from "../components/player/player.jsx";
import { HourScopeProvider } from "../contexts/hourAnimation.jsx";
import { getImages } from "../services/images.js";
import { openWeather } from "../services/openWeather.js";
import { customMarkerIcon } from '../components/marker/marker.jsx';

const greenOptions = { color: "#00000000", fillColor: "#00000050" };

export default function OperationalInformation() {
  const [morroDaIgreja, setMorroDaIgreja] = useState("");
  const [cangucu, setCangucu] = useState("");
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const radarInformation = await getRadarInformation();
        setMorroDaIgreja(radarInformation.morroDaIgreja);
        setCangucu(radarInformation.cangucu);
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataWeather = async () => {
      try {
        const weatherInformation = await openWeather();
        console.log(weatherInformation);
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchDataWeather();
  }, []);

  const playImages = async () => {
    const images = await getImages();
    setImages(images);
    console.log(images);

    let currentIndex = currentImageIndex; // Use o índice atual de imagem como ponto de partida
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

  return (
    <>
      <Tabs activeTab={activeTab} onClick={handleTabClick} />
      {activeTab === 0 ? (
        <>
          <HourScopeProvider>
            <MenuMap />
          </HourScopeProvider>
          <Player
            playGif={playImages}
            onClick={handlerSrcFunc}
            pauseGif={pauseGif}
          />
          <MapContainer
            center={[-28.128373, -49.471816]}
            zoom={5.5}
            scrollWheelZoom={false}
            style={{ width: "100vw", height: "90vh" }}
          >
           
            {/*<Rectangle bounds={boundsMorroDaIgreja} pathOptions={{ color: 'black' }}/>*/}
            <Pane style={{ zIndex: 500, border: "1px solid" }}>
              <Circle
                center={[-28.128373, -49.471816]}
                pathOptions={greenOptions}
                radius={400000}
                border={false}
              />
            </Pane>
            {/*<Rectangle bounds={boundsCangucu} pathOptions={{ color: 'red' }}/>*/}
            <Pane style={{ zIndex: 500 }}>
              <Circle
                center={[-31.404, -52.701644]}
                pathOptions={greenOptions}
                radius={400000}
                border={false}
              />
        
            </Pane>
            <Marker position={[ -33.5257, -53.3711]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -32.0350, -52.0986]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -31.3662, -51.9716]} icon={customMarkerIcon}></Marker>
            <Marker position={[ -29.8262, -50.5179]} icon={customMarkerIcon}></Marker>
            {cangucu.path && (
              <ImageOverlay
                bounds={boundsCangucu}
                url={
                  handlerSrc ? images[currentImageIndex].cangucu : cangucu.path
                }

              />
            )}
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

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>{" "}
        </>
      ) : (
        <p>alguma coisa</p>
      )}
    </>
  );
}
