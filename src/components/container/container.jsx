import { useLocation } from "react-router-dom";
import Radar from "../../pages/Radar";
import Home from "../../pages/Home";
import Station from "../../pages/Station";
import Satellite from "../../pages/Sattelite";

export default function Container() {
  const location = useLocation();
  return (
    <>
      <section>
        {location.pathname ==='/' && <Home/>}
        {location.pathname === "/radar" && <Radar />}
        {location.pathname === '/estacao' && <Station/>}
        {location.pathname === '/satelite' && <Satellite/>}
      </section>
    </>
  );
}