import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <a href="#" className="logo">
        TASKFLOW
      </a>
      <nav className="navbar">
        <a>
          <Link className="link" to="#">
            Home
          </Link>
        </a>

        <a>
          <Link className="link" to="/About">
            About
          </Link>
        </a>
        <a>
          <Link className="link" to="/Services">
            Services
          </Link>
        </a>
        <a>
          <Link className="link" to="/Contact">
            Contact
          </Link>
        </a>
        <a>
          <Link className="link" to="/Task">
            Task
          </Link>
        </a>
        <a>
          <Link className="link" to="/Demo">
            Demo
          </Link>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
