import React from "react";
import "./SignIn.css";
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";

const SignIn = () => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".wrapper"), {
      max: 10,
      speed: 5,
      glare: true,
      "max-glare": 0.5,
    });
  });
  return (
    <div className="baseGlass wrapper">
      <form action="">
        <h1>SignIn</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox"></input>Remember me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit">SignIn</button>
        <div className="register-link">
          <p>
            Don't have an account?<a href="#">Register Now</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
