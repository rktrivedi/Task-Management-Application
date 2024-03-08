import React, {useState} from "react";
import "./Task.css";
import {MdSubtitles} from "react-icons/md";
import {FaSearch} from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cards from "../../Components/Card/Card";
import {FaFilter} from "react-icons/fa6";
const Todo = () => {
  const [input, setInputs] = useState({title: "", body: ""});
  const [Array, setArray] = useState([]);

  const inputChange = (e) => {
    const {name, value} = e.target;
    setInputs({...input, [name]: value});
  };
  const submit = (e) => {
    e.preventDefault();
    if (input.title === "" || input.body === "") {
      toast.error("Title and Body Can't be Empty");
    } else {
      setArray([...Array, input]);
      console.log(Array);
      setInputs({title: "", body: ""});
      toast.success("Your Task Is Added");
    }
  };

  return (
    <div className="mainContanier">
      <div className="todo-main">
        <ToastContainer toastStyle={{backgroundColor: "black"}} />
        <div className="Input-area">
          <h3>Add Your Task </h3>
          <form>
            <div className="input-box">
              <input
                maxLength="50"
                type="text"
                placeholder="Title"
                value={input.title}
                onChange={inputChange}
                name="title"
              />
              <MdSubtitles className="icon" />
            </div>
            <div className=" textarea">
              <textarea
                type="text"
                placeholder=""
                value={input.body}
                onChange={inputChange}
                name="body"
              />
              {/* <BiSolidMessageRoundedDetail className="icon" /> */}
            </div>
            <div className="button">
              <button onClick={submit} type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="cardlist">
        <div className="controls">
          <div className="searchbox">
            <input type="search"></input>
            <FaSearch className="icon" />
          </div>
          <div className="button1">
            <FaFilter />
            <button className="filterbtn" type="submit">
              All Task{" "}
            </button>
            <button className="filterbtn" type="submit">
              In Progress
            </button>
            <button className="filterbtn" type="submit">
              Completed
            </button>
          </div>
        </div>
        <div className="container1">
          {Array &&
            Array.map((item, idx) => (
              <>
                <Cards key={idx} id={idx} title={item.title} body={item.body} />
              </>
            ))}
        </div>
        <div className="pagination">
          <h6>1</h6>
          <h6>2</h6>
          <h6>3</h6>
          <h6>4</h6>
        </div>
      </div>
    </div>
  );
};

export default Todo;
