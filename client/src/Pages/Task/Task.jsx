import React, {useState} from "react";
import "./Task.css";
import {MdSubtitles} from "react-icons/md";
import {FaSearch} from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cards from "../../Components/Card/Card";
import {FaFilter} from "react-icons/fa6";
import Update from "../../Components/UpdateModal/UpdateModal";

const Todo = () => {
  const [input, setInputs] = useState({
    title: "",
    body: "",
    status: "In Progress",
  });
  const [taskArray, setArray] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateTaskIndex, setUpdateTaskIndex] = useState(-1);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInputs({...input, [name]: value});
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.title === "" || input.body === "") {
      toast.error("Title and Body Can't be Empty");
    } else {
      setArray([...taskArray, {...input, completed: "In Progress"}]);
      // setArray([...taskArray, input]);
      console.log(taskArray);
      setInputs({title: "", body: "", status: "In Progress"});
      // toast.success("Your Task Is Added");
    }
  };

  const deleteTodo = (id) => {
    taskArray.splice(id, "1");
    setArray([...taskArray]);
  };

  const openUpdateModal = (idx) => {
    setUpdateTaskIndex(idx);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = (updatedTitle, updatedBody) => {
    const updatedTaskArray = [...taskArray];

    if (updateTaskIndex !== -1) {
      updatedTaskArray[updateTaskIndex] = {
        title: updatedTitle,
        body: updatedBody,
      };

      setArray(updatedTaskArray);
      toast.success("Task Updated Successfully");
    }

    closeUpdateModal();
  };
  // Filtering the Task
  const handleFilter = (type) => {
    setCurrentFilter(type);
  };

  const filteredTasks = () => {
    const filteredBySearch = taskArray.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (currentFilter === "all") {
      return taskArray;
    } else if (currentFilter === "inProgress") {
      return taskArray.filter((item) => item.status === "In Progress");
    } else if (currentFilter === "completed") {
      return taskArray.filter((item) => item.status === "Completed");
    }
  };

  const updateList = (index, updatedTitle, updatedBody, status) => {
    const updatedTaskArray = [...taskArray];

    if (index !== -1) {
      updatedTaskArray[index] = {
        ...updatedTaskArray[index],
        title: updatedTitle,
        body: updatedBody,
        status: status,
      };

      setArray(updatedTaskArray);
      toast.success("Task Updated Successfully");
    }

    closeUpdateModal();
  };

  const handleComplete = (id) => {
    const updatedTaskArray = [...taskArray];
    if (id !== -1) {
      updatedTaskArray[id] = {
        ...updatedTaskArray[id],
        status: "Completed",
      };
      setArray(updatedTaskArray);
      toast.success("Task Completed Successfully");
    }
  };

  const handleInProgress = (id) => {
    const updatedTaskArray = [...taskArray];
    if (id !== -1) {
      updatedTaskArray[id] = {
        ...updatedTaskArray[id],
        status: "In Progress",
      };
      setArray(updatedTaskArray);
      toast.success("Task set to In Progress");
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
                onChange={handleInputChange}
                name="title"
              />
              <MdSubtitles className="icon" />
            </div>
            <div className=" textarea">
              <textarea
                type="text"
                placeholder=""
                value={input.body}
                onChange={handleInputChange}
                name="body"
              />
              {/* <BiSolidMessageRoundedDetail className="icon" /> */}
            </div>
            <div className="button">
              <button onClick={handleFormSubmit} type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="cardlist">
        <div className="controls">
          <div className="searchbox">
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Search tasks"
            ></input>
            <FaSearch className="icon" />
          </div>
          <div className="button1">
            <FaFilter />
            <button
              className={`filterbtn ${currentFilter === "all" && "active"}`}
              onClick={() => handleFilter("all")}
              type="submit"
            >
              All Task{" "}
            </button>
            <button
              className={`filterbtn ${
                currentFilter === "inProgress" && "active"
              }`}
              onClick={() => handleFilter("inProgress")}
              type="submit"
            >
              In Progress
            </button>
            <button
              className={`filterbtn ${
                currentFilter === "completed" && "active"
              }`}
              onClick={() => handleFilter("completed")}
              type="submit"
            >
              Completed
            </button>
          </div>
        </div>
        <div className="container1">
          {filteredTasks() &&
            filteredTasks().map((item, idx) => (
              <>
                <Cards
                  key={idx}
                  delid={deleteTodo}
                  id={idx}
                  title={item.title}
                  body={item.body}
                  status={item.status}
                  handleComplete={() => handleComplete(idx)}
                  handleInProgress={() => handleInProgress(idx)}
                  updateList={() => openUpdateModal(idx)}
                />
                {isUpdateModalOpen && (
                  <Update onClose={closeUpdateModal} onUpdate={handleUpdate} />
                )}
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
      <div className="todo-update">
        <Update />
      </div>
    </div>
  );
};

export default Todo;
