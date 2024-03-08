import React, {useState} from "react";
import {MdSubtitles} from "react-icons/md";
import {BiSolidMessageRoundedDetail} from "react-icons/bi";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Update.css";

const Update = ({onClose, onUpdate}) => {
  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const inputChange = (e) => {
    const {name, value} = e.target;
    setInput((prevInput) => ({...prevInput, [name]: value}));
  };

  const submit = () => {
    onUpdate(input.title, input.body);
    onClose();
  };

  return (
    <>
      <ToastContainer toastStyle={{backgroundColor: "black"}} />
      <div className="modalUpdate">
        <div className="update-popUp">
          <div className="Input-area1">
            <h3>Update Your Task </h3>
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
            <div className="input-box textarea1">
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
              <button onClick={submit} type="button">
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
