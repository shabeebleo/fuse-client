import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../redux/postSlice";
import axios from "../../axios/axios";

function Posts() {
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.posts);

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/posts/timeline", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(setPosts(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Posts">
      {postData?.map((post, id) => {
        return <Post data={post} id={id} key={id} />;
      })}
    </div>
  );
}

export default Posts;
