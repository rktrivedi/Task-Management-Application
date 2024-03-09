import React, {useState} from "react";
import "./SignUp.css";
import {FaUser} from "react-icons/fa";
import {FaLock} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link, useNavigate} from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";
import {signUp} from "../../services/api";
import {FaClipboardUser} from "react-icons/fa6";

const SignUp = ({user, setUser}) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigation = useNavigate();
  useEffect(() => {
    if (user) {
      navigation("/SignIn");
    }
  }, []);
  const [error, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp(form);
    console.log(result);
    toast("User Registered Succesfully");
    setErrors(null);

    if (result.status == 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/SignIn");
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
      <form action="">
        <h1>SignUp</h1>
        <div className="input-box">
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          {error?.name && <small>{error.name.msg}</small>}
          <FaClipboardUser className="icon" />
        </div>
        <div className="input-box">
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            required
          />
          {error?.username && <small>{error.username.msg}</small>}
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {error?.password && <small>{error.password.msg}</small>}
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="E-Mail"
            required
          />
          {error?.email && <small>{error.email.msg}</small>}
          <MdEmail className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox"></input>Remember me
          </label>
          {/* //<a href="#">Forgot Password</a> */}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        <div className="register-link">
          <p>
            Already have an account?{" "}
            <Link className="link" to="/SignIn">
              Sign In Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
