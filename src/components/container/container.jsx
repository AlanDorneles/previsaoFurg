import { useLocation } from "react-router-dom";
import Radar from "../../pages/Radar";
import Home from "../../pages/Home";
import Clima from "../../pages/Clima";

export default function Container() {
  const location = useLocation();
  return (
    <>
      <section>
        {location.pathname ==='/' && <Home/>}
        {location.pathname === "/radar" && <Radar />}
        {location.pathname === "/clima" && <Clima />}
      </section>
    </>
  );
}