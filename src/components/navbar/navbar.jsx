import { Link } from "react-router-dom";
import logoFurg from "../../../public/logo-furg.png";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineRadarChart } from "react-icons/ai";
import { RiBaseStationLine } from "react-icons/ri";
import { GiSattelite } from "react-icons/gi";
import '../../sass/navbar.scss'


import { useState } from "react";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className={`navbar `}
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logoFurg} alt="logo-furg" className="image is-40x40" />
        </a>
        <div
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link to="/" className={`navbar-item ` }>
            <IoHomeOutline/>
              Home
          </Link>
          <Link to="/radar" className={`navbar-item` }>
            <AiOutlineRadarChart />

              Radar
          </Link>
          <Link to="/estacao" className={`navbar-item` }>
            <RiBaseStationLine />
              Estações
          </Link>
          <Link to="/satelite" className={`navbar-item`}>
          <GiSattelite/>
            Satélite
          </Link>
        </div>
      </div>
    </nav>
  );
};
