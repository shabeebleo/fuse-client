import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";
import "./FollowerModal.css";
export const FollowerModal = ({ modalOpened, setModalOpened ,profileUserId,followerClick}) => {
  console.log("in thi try getfollowers")
  const { userData } = useSelector((state) => state.user);
  const userId = userData?._id;
  // const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([])
  const theme = useMantineTheme();

//to get follower data.....
  const getFollowers = async () => {
    if(followerClick){
      console.log("in thi try getfollowers getFollowers")
      try {
        const response = await axios.get(`/user/followers/${profileUserId?profileUserId:userId}`,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        });
  
        console.log(response.data,"getData ethi mon     getFollowersgetFollowersgetFollowersgetFollowersgetFollowers");
        setFollowers(response.data)
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("in thi try getfollowers  getFolloing")
      try {
        const response = await axios.get(`/user/following/${profileUserId?profileUserId:userId}`,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        });
  
        console.log(response.data,"getData ethi mon     getFollowings");
        setFollowers(response.data)
      } catch (error) {
        console.log(error);
      }
    }
   
  };

  useEffect(() => {
    getFollowers();
  
  }, [modalOpened]);

const onclose=()=>{
  setModalOpened(false);
  setFollowers([])
}

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="30%"rs
      opened={modalOpened}
      onClose={onclose}
    >
      <div className="FollowersCard">followerModal
      {followers.map((follower, id) => {
        return (
          <div key={id} className="follower">
            <div>

            <img src={follower.profilePicture} className="followerImg" alt="" />
            </div>
            <div className="name">
              
                <span>{follower.firstname}</span>
           
                <span>@{follower.username}</span>
              
            </div>
          </div>
        );
      })}
      </div>
    
    </Modal>
  );
};
