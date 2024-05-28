import React, { useState, useRef, useEffect } from "react";
import Profile from "../../img/profileImg.jpg";
import "./Postshare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import { hideloading, showloading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";

function PostShare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const userId = userData?._id;
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    desc: "",
  });

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({ image: img });
    }
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  
  const getAllPosts = async () => {
    try {
      const response = await axios.get("/posts/timeline", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data,"post response in post jsx ")
      dispatch(setPosts(response.data));
    } catch (error) {}
  };
  const reset = () => {
    document.getElementById("desc").value = null;
    setImage(null);
  };

  const uploadPost = async () => {
    try {
      dispatch(showloading());

      formData.userId = userId;

    
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
     
     await axios.post(`/posts/createPost/${userId}`, formData, config);
     
      reset();
      dispatch(hideloading());
    } catch (error) {
      console.log(error);
    }

    //to update state of posts to avoid only getting updating post while reloading
    getAllPosts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please choose a file");
    }
    uploadPost();
  };
  useEffect(() => {

    setFormData({ ...formData, ...image });
   // eslint-disable-next-line
  }, [image]);

  return (
    <div className="PostShare">
      <img style={{cursor:"pointer"}} src={Profile} alt=""     onClick={() => {
            navigate("/profile", {
              state: {
                userData: userData,
              },
            });
          }} />

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          id="desc"
          name="desc"
          onChange={handleChange}
          required
          type="text"
          placeholder="what's happening"
        />
        <div className="postOptions">
          `<div
            className="options"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          {/* <div className="options" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="options" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="options" style={{ color: "var(--teal)" }}>
            <UilSchedule />
            Schedule
          </div> */}
          <button
            className="button ps-button"
            style={{ height: "2rem", width: "4.5rem" }}
            type="submit"
          >
            share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="image"
              ref={imageRef}
              multiple={false}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => {
                setImage(null);
              }}
            />
            <img src={URL.createObjectURL(image.image)} alt="" />
          </div>
        )}
      </form>
    </div>
  );
}

export default PostShare;
