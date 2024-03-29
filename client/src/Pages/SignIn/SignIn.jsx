import React, {useState} from "react";
import "./SignIn.css";
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../../services/api";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";
import {authActions} from "../../store";

const SignIn = ({user, setUser}) => {
  const dispath = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigate();
  useEffect(() => {
    if (user) {
      navigation("/Task");
    }
  }, []);
  const [error, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    setErrors(null);

    if (result.status == 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/Task");
        dispath(authActions.login());
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

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
      <ToastContainer />
      <form action="">
        <h1>SignIn</h1>
        <div className="input-box">
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            required
          />
          <FaUser className="icon" />
          {error?.username && <small>{error.username.msg}</small>}
        </div>

        <div className="input-box">
          <input
            onChange={handleChange}
            name="password"
            autoComplete="oldPassword"
            type="password"
            placeholder="Password"
            required
          />
          <FaLock className="icon" />
          {error?.username && <small>{error.username.msg}</small>}
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox"></input>Remember me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button onClick={handleSubmit} type="submit">
          SignIn
        </button>
        <div className="register-link">
          <p>
            Don't have an account?
            <Link className="link" to="/SignUp">
              Register Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
