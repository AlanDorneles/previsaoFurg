import { useLocation } from "react-router-dom";
import Satellite from "../pages/Sattelite";
import Radar from "../pages/Home";




export default function Container() {
  const location = useLocation();
  return (
    <>
      <section>
        {location.pathname ==='/' && <Radar/>}
        {location.pathname === '/satelite' && <Satellite/>}
      </section>
      
    </>
  );
}