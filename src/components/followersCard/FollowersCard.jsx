import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

function FollowersCard() {
  const { userData } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const userId = userData;
  const currentUserId = userData?._id;
  const navigate = useNavigate();
  const [currentFollowersPage, setcurrentFollowersPage] = useState(1);
  const personsPerPage = 5;
  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userId]);

  const followUnfollow = async (id) => {
    try {
      const response = await axios.put(`user/${id}/follow`, id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data);
      }

      console.log(response, "respnsse in follow");
    } catch (error) {
      console.log(error);
    }
    getAllUsers();
  };

  const openProfile = async (user, id) => {
    navigate("/profile", {
      state: {
        userData: user,
      },
    });
    try {
      console.log(id, "userId in opin profile");
      const data = {};
      data.senderId = currentUserId;
      data.receiverId = id;
      const response = await axios.post("/chat", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response, "response in 2nd function of followunfollow");
    } catch (error) {
      console.log(error);
    }
    console.log("navigating part in opin profile");
  };

  //get follower list by pagination

  const indexofLastFollowersPerson = currentFollowersPage * personsPerPage;
  const indexofFirstFollowersPerson =
    indexofLastFollowersPerson - personsPerPage;
  const currentFollowersList = users.slice(
    indexofFirstFollowersPerson,
    indexofLastFollowersPerson
  );

  const followersPaginate = (pageNumber) => {
    console.log(pageNumber, "pagenumber");
    setcurrentFollowersPage(pageNumber);
  };

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>
      {currentFollowersList.map((follower, id) => {
        return (
          <div className="follower" key={id}>
            <div>
              <img style={{cursor:"pointer"}}
                onClick={() => {
                  openProfile(follower, follower._id);
                }}
                src={follower.profilePicture}
                className="followerImg"
                alt=""
              />
              <div className="name">
                <span>@{follower.username}</span>
              </div>
            </div>
            <div>
              <button
                className="button fc-button"
                onClick={() => {
                  followUnfollow(follower._id);
                }}
              >
                {follower.followers.includes(currentUserId)
                  ? "Unfollow"
                  : "follow"}
              </button>
            </div>
          </div>
        );
      })}
      <Pagination
        peoplePerPage={personsPerPage}
        totalPersons={users.length}
        paginate={followersPaginate}
      />
    </div>
  );
}

export default FollowersCard;
