import React, {useEffect, useState} from "react";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/index";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const navigation = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    setUser(localuser);
  }, []);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigation("/login");
  };
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
        {isLoggedIn && (
          <Link className="link" to="/Task">
            Task
          </Link>
        )}

        {/* {!isLoggedIn && (
          <>
            <Link className="link" to="/SignIn">
              SignIn
            </Link>
            <Link className="link" to="/SignUp">
              SignUp
            </Link>
          </>
        )} */}
        {isLoggedIn && (
          <>
            <Link className="link" to="/Profile">
              Profile
            </Link>
            <Link onClick={handleLogout} className="link" to="/">
              Logout
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
