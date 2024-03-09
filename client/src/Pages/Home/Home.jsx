import React, {useState} from "react";
import "./Home.css";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import home from "../../Assets/home.png";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/index";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".box"), {
      max: 1,
      speed: 1,
      glare: true,
      "max-glare": 0.1,
    });
  });
  return (
    <div className="container">
      <div className="ball-1"></div>
      <div className="ball-2"></div>
      <div className="ball-3"></div>
      <div className="box">
        <div className="contains">
          <div className="section-1">
            <h1>Welcome</h1>
            <h3>
              To Our <span>' </span>Task Management<span> '</span>
              <br></br>
              <span>Application</span>
            </h3>
            <p>Please Sign-Up to start managing your task.</p>
            {!isLoggedIn && (
              <div className="button">
                <Link className="link" to="/SignUp">
                  Sign-Up
                </Link>
                <span> </span>
                <Link className="link" to="/SignIn">
                  Sign-In
                </Link>
              </div>
            )}
          </div>
          <div className="section-1">
            <img src={home} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
