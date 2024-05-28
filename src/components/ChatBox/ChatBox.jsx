import axios from "../../axios/axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./ChatBox.css";
import moment from 'moment'
import InputEmoji from "react-input-emoji";
function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  console.log(userData, "userData state");

  console.log(messages, "messages");
  console.log(newMessage, "newMessage");

  useEffect(() => {
    if (receiveMessage != null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
      // eslint-disable-next-line
  }, [receiveMessage]);

  // fetching data for the header of chat box

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const response = await axios.get(`/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data, "in chat box respoonse.data");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat != null) {
      getUserData();
    }
  }, [chat, currentUser]);

  // fetching  for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(chat, "chat in fetchMessages");
        const { data } = await axios.get(`/message/${chat?._id}`);
        console.log(data, "data in fetchamessages");
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //handle send

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    //send message to database

    try {
      const data = await axios.post("/message", message, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(data, "in send message");
      setMessages([...messages, data.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    //send message to socket server

    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId });
  };
  //always scroll to the last messsage

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    className="followerImage"
                    src={userData?.profilePicture}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="name"
                    style={{
                      fontSize: "0.8rem",
                    }}
                  >
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/*chatbox messages*/}
            <div className="chat-body">
              <div className="chat-body">
                {messages.map((message) => (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>{" "}
                      <span>{moment(message.createdAt).fromNow()}</span>
                     
                    </div>
                  </>
                ))}
              </div>
            </div>
            {/*chat sender*/}
            <div className="chat-sender">
              <div></div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div onClick={handleSend} className="send-button button">
                send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
