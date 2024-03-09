import React, {useState} from "react";
import "./Contact.css";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import contact from "../../Assets/contact.png";
import newcontact from "../../Assets/newcontact.jpg";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/index";
import {FaLinkedin} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";
import {FaGithubSquare} from "react-icons/fa";
import {FaInstagramSquare} from "react-icons/fa";

const Contact = () => {
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
          <div className="section-1 contactsection">
            <h2>Contact Information:</h2>
            <h3>
              Company Name: <span> TaskFLOW </span>
              <br></br>
            </h3>
            <h5>
              Address: <span>IT Park, Model Town,Bhilai </span>
            </h5>
            <h5>
              Phone: <span>+8103796895 </span>
            </h5>
            <h5>
              Email: <span>trivedi.rohit@outlook.com </span>
            </h5>
            <h4>Follow Us On:</h4>
            <div className="icons socialicons">
              <a href="https://www.linkedin.com/in/rktrivedi/" target="blank">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/rkt_trivedi" target="blank">
                <FaSquareXTwitter />
              </a>
              <a href="https://github.com/rktrivedi" target="blank">
                <FaGithubSquare />
              </a>
              <a href="https://www.instagram.com/rkt_trivedi/" target="blank">
                <FaInstagramSquare />
              </a>
            </div>
            <div className="details">
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
          </div>
          <div className="section-1 contact-image">
            <img src={newcontact} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
