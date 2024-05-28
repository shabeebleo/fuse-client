import React from "react";
import "./AdminLogin.css";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice.js";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {

    try {
      dispatch(showloading());
      const response = await axios.post("/admin/login", values);
      console.log(response, "rsponse from login");
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("redirecting to Home page");
        localStorage.setItem("adminToken", response.data.adminToken);
        navigate("/adminHome");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      toast.error("something went wrong");
    }
    console.log("recieved values", values);
  };
  return (
    <div className="authentication  ">
      <div className="authentication-form card p-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" />
          </Form.Item>
          <Button className="primary-button mt-3 my-2" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLogin;
