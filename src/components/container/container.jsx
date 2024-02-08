import { useLocation } from "react-router-dom";
import Radar from "../../pages/Home";
import Satellite from "../../pages/Sattelite";
import { Navbar } from "../navbar/navbar";


export default function Container() {
  const location = useLocation();
  return (
    <>
      <Navbar/>
      <section>
        {location.pathname ==='/' && <Radar/>}
        {location.pathname === '/satelite' && <Satellite/>}
      </section>
    </>
  );
}