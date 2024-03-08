import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Task from "./Pages/Task/Task";
import Home from "./Pages/Home/Home";
import {NavbarProvider} from "./Context/NavbarContext";
import {useState} from "react";

function App() {
  const info = localStorage.getItem("user");

  const [user, setUser] = useState(JSON.parse(info));
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/SignIn"
            element={<SignIn user={user} setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
