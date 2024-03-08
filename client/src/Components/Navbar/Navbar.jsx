import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <Link className="logo">TASKFLOW</Link>
      <nav className="navbar">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/About">
          About
        </Link>
        <Link className="link" to="/Contact">
          Contact
        </Link>
        <Link className="link" to="/Task">
          Task
        </Link>
        <Link className="link" to="/SignIn">
          SignIn
        </Link>
        <Link className="link" to="/SignUp">
          SignUp
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
