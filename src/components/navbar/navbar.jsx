import { Link } from "react-router-dom";
import logoFurg from "../../../public/logo-furg.png";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineRadarChart } from "react-icons/ai";
import { FaCloudSunRain } from "react-icons/fa";


import { useState } from "react";

export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className="navbar"
      style={{ backgroundColor: "#323233", padding: "0 1rem", height: "56px" }}
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
          <Link to="/home" className="navbar-item">
            <IoHomeOutline/>
              Home
          </Link>
          <Link to="/radar" className="navbar-item">
            <AiOutlineRadarChart />

              Radar
          </Link>
          <Link to="/clima" className="navbar-item">
            <FaCloudSunRain />

              Clima
          </Link>
        </div>
      </div>
    </nav>
  );
};
