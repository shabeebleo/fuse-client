import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";

function Profile() {

  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-Centre">
        <ProfileCard />
        <PostSide />
      </div>
      <RightSide />
    </div>
  );
}

export default Profile;
