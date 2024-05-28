import React, { useEffect, useState } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import "./LogoSearch.css";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { UilTimes } from "@iconscout/react-unicons";

function LogoSearch() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const currentUserId = userData?._id;

  //searchUser

  const searchUser = async (query) => {
    if (query !== "") {
      const data = await axios.get(`/user/searchUser/${query}`);
      console.log(data, "search userdata");
      setData(data.data);
    }
  };

  useEffect(() => {
    searchUser(query);
  }, [query]);


  //open profile

  const openProfile = async (user, id) => {
    navigate("/profile", {
      state: {
        userData: user,
      },
    });
    try {
      const data = {};
      data.senderId = currentUserId;
      data.receiverId = id;
      await axios.post("/chat", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="searchPart">
      {" "}
      <div className="LogoSearch">
        <img 
          onClick={() => {
            navigate("/home");
          }}
          src={Logo}
          style={{ width: "4rem", height: "4rem", marginTop: "-.5rem" }}
          alt=""
        />
        <div className="Search">
          <input
            type="text"
            placeholder="#Explore"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          <div className="s-icon">
            <UilSearch />
          </div>
        </div>
      </div>
      <div className="allSearchPart">
        <div className="closeIcon">
          {query && (
            <UilTimes
              onClick={() => {
                setQuery(null);
              }}
            />
          )}
        </div>

        {query &&
          data?.map((user,id) => {
            return (
              <div key={id} className="userSearch">
                <span
                  onClick={() => {
                    openProfile(user, user?._id);
                  }}
                >
                  {user.firstname}
                </span>
                <div></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LogoSearch;
