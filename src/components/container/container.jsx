import { useLocation } from "react-router-dom";
import Radar from "../../pages/Radar";
import Home from "../../pages/Home";
import Satellite from "../../pages/Sattelite";
import Team from "../../pages/Team";

export default function Container() {
  const location = useLocation();
  return (
    <>
      <section>
        {location.pathname ==='/' && <Home/>}
        {location.pathname === "/radar" && <Radar />}
        {location.pathname === '/equipe' && <Team/>}
        {location.pathname === '/satelite' && <Satellite/>}
      </section>
    </>
  );
}