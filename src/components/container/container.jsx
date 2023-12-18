import { useLocation } from "react-router-dom";
import Meteorologia from "../../pages/Meteorologia";
import OperationalInformation from "../../pages/Operational";

export default function Container() {
  const location = useLocation();
  return (
    <>
      <section>
          {location.pathname === "/" && <OperationalInformation />}
        {location.pathname === "/meteorologia" && <Meteorologia />}
      </section>
    </>
  );
}