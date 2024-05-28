import React, { useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FollowerModal } from "../followerModal/FollowerModal";
import { useNavigate } from "react-router-dom";
function ProfileCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpened, setModalOpened] = useState(false);
  let profileDetails = location?.state?.userData;
  var { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.posts);
  const ProfilePage = true;
  const [followerClick, setfollowerClick] = useState(false);
  const profileUserId = profileDetails?._id;

  ///followeresw modal
  const followersModal = () => {
    setModalOpened(true);
  };
console.log(userData,"userData in profile data")
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img style={{
      borderTopLeftRadius:"1.35rem", // Adjust the radius as needed
      borderTopRightRadius: '1.35rem' // Adjust the radius as needed
    }}
          src={
            profileDetails
              ? profileDetails.coverPicture
              : userData?.coverPicture
          }
          alt=""
        />
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/profile", {
              state: {
                userData: userData,
              },
            });
          }}
          src={
            profileDetails
              ? profileDetails.profilePicture
              : userData?.profilePicture
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileDetails ? profileDetails.firstname : userData?.firstname}
        </span>
        <span>
          {profileDetails ? profileDetails.worksat : userData?.worksat}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                followersModal(setfollowerClick(true));
              }}
            >
              followers{" "}
            </span>

            <span>
              {profileDetails
                ? profileDetails.followers.length
                : userData?.followers.length}
            </span>
            <FollowerModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              profileUserId={profileUserId}
              followerClick={followerClick}
            />
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                followersModal(setfollowerClick(false));
              }}
            >
              following
            </span>

            <span>
              {profileDetails
                ? profileDetails.following.length
                : userData?.following.length}
            </span>
          </div>
          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>Posts</span>
                <span>{postData?.length}</span>
              </div>
            </>
          )}
        </div>

        <hr />
      </div>
      {ProfilePage ? "" : <span>My profile</span>}
    </div>
  );
}

export default ProfileCard;
