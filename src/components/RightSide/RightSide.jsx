import React from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import { useNavigate } from "react-router-dom";
import Comment from "../../img/comment.png";
import logOut from "../../img/logOut.png";

function RightSide() {
  const navigate = useNavigate();
  const logOutt = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="RightSide">
      <div className="navIcons">
        <img
          onClick={() => {
            navigate("/home");
          }}
          src={Home}
          alt=""
        />
        <img
          onClick={() => {
            navigate("/chat");
          }}
          src={Comment}
          alt=""
        />
        <img onClick={logOutt} src={logOut} alt="" />
      </div>
    </div>
  );
}

export default RightSide;
