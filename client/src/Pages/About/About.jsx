import React, {useState} from "react";
import "./About.css";
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

const About = () => {
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
          <div className="section-1 ">
            <h3>
              About : TaskFLOW
              <br></br>
            </h3>
            <div className="taskParagarph">
              <h5>
                TaskFlow is your go-to solution for efficient and organized task
                management. Our user-friendly website empowers individuals and
                teams to streamline their workflow, prioritize tasks, and meet
                deadlines with ease. With intuitive features and a sleek
                interface, TaskFlow ensures that you stay on top of your
                projects, collaborate seamlessly, and achieve maximum
                productivity. Say goodbye to scattered to-do lists and hello to
                a more organized, productive work life with TaskFlow.
              </h5>
            </div>

            <div className="social">
              <div>
                <h4>Know More About us @</h4>
              </div>
              <div className="icons">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
