import axios from "../../axios/axios";
import React, { useEffect, useState } from "react";

function Conversation({ data, currentUserId,online }) {
  console.log(
    data,
    "data",
    currentUserId,
    "currentUserIddata,currentUserIddata,currentUserId in consversation"
  );

  const [userData, setUserData] = useState(null);
  console.log(userData, "userSData 2nd");
  useEffect(() => {
    console.log("use usffect");
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const response = await axios.get(`/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response,"getUserData in conversatiion")
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(userId){
      getUserData();
    }
    
  }, [data, currentUserId]);

  return (
    <>
      <div className="follower conversation">
        <div>
         {online&& <div className="online-dot"> </div>}
          <img
            className="followerImage"
            src={userData?.profilePicture}
            alt=""
            style={{ width: "50px", height: "50px",borderRadius:"50%" }}
          />
          <div
            className="name"
            style={{
              fontSize: "0.8rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
           <span>{online?"online":"offline"}</span>
          
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation;
