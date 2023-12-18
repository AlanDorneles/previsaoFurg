import { Link } from "react-router-dom";
import logoFurg from "../../../public/logo-furg.png";

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
        <a className="navbar-item" href="https://bulma.io">
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
          <Link to="/" className="navbar-item">
              Home
          </Link>
          <Link to="/meteorologia" className="navbar-item">
              Metereologia
          </Link>
        </div>
      </div>
    </nav>
  );
};
