import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { useNavigate } from "react-router-dom";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function InfoCard() {

  const navigate = useNavigate();
  const location = useLocation();
  let profileDetails = location?.state?.userData;
  const { userData } = useSelector((state) => state.user);
  const userId = userData?._id;
  const [modalOpened, setModalOpened] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  
  useEffect(() => {
    if (userId === profileDetails._id) {
      setMyProfile(true);
    } else {
      setMyProfile(false);
    }
  }, [profileDetails, userId]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h4>Your Info</h4>
        {myProfile && (
          <div>
            <UilPen
              width="2rem"
              hieght="1.2rem"
              onClick={() => {
                setModalOpened(true);
              }}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>In Relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>
          {profileDetails ? profileDetails.livesin : userData?.livesin}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works At </b>
        </span>
        <span>
          {profileDetails ? profileDetails.worksat : userData?.worksat}
        </span>
      </div>
      <button onClick={logOut} className="button logout-button">
        LogOut
      </button>
    </div>
  );
}

export default InfoCard;
