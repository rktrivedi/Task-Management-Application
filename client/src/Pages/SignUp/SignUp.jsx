import React from "react";
import "./SignUp.css";
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {Link} from "react-router-dom";

import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";

const SignUp = () => {
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
        <h1>SignUp</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="E-Mail" required />
          <MdEmail className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox"></input>Remember me
          </label>
          {/* //<a href="#">Forgot Password</a> */}
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Already have an account?{" "}
            <a>
              <Link className="link" to="/SignIn">
                Sign In Now
              </Link>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
