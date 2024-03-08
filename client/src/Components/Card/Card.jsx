import React, {useState} from "react";
import "./Card.css";
import {MdDelete} from "react-icons/md";
import {MdEditSquare} from "react-icons/md";
import {FaCheckSquare} from "react-icons/fa";
import {TbProgressAlert} from "react-icons/tb";
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";
import VanillaTilt from "vanilla-tilt";
import {useEffect} from "react";

const Cards = ({title, body, id, delid, updateList}) => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".cards"), {
      max: 10,
      speed: 5,
      glare: true,
      "max-glare": 0.1,
    });
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cards">
      <div className="heading" onClick={toggleAccordion}>
        <h4>{title}</h4>
        <span>
          {isOpen ? (
            <IoIosArrowUp className="icon" />
          ) : (
            <IoIosArrowDown className="icon" />
          )}
        </span>
      </div>

      {isOpen && (
        <div className="datacontainer">
          <div className="body">{body}</div>
          <div className="buttons">
            <TbProgressAlert className="icons" />
            <FaCheckSquare className="icons" />
            <MdEditSquare className="icons" onClick={updateList} />
            <MdDelete className="icons" onClick={() => delid(id)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
