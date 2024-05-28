import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import axios from "../../axios/axios";
import Conversation from "../../components/Conversation/Conversation";
import Comment from "../../img/comment.png";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);


  const user = userData;
  const socketurl = "https://socket-fig9.onrender.com"
  // send message to socket server
  useEffect(() => {
    if (sendMessage != null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io(socketurl);
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user?._id]);

  // receive message from socket server

  useEffect(() => {
    console.log("useEffect in  receive message");
    socket.current.on("receive-message", (data) => {
      console.log(data, "receive-message");
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(`/chat/${user?._id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setChats(data);
        console.log(data, "getData in chat");
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/*lft side*/}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUserId={user?._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*rigth side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <img src={Home} alt="" />
            <img src={Noti} alt="" />
            <img
              onClick={() => {
                navigate("/chat");
              }}
              src={Comment}
              alt=""
            />
          </div>
          {/*chat body*/}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user?._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
