import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    confirmpass: "",
  });
  const [error, setError] = useState("");
  const [confirmpass, setConfirmpass] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data, "login data");
  };

  const handleSubmit = async (e) => {
    let confirmpas = true;
    e.preventDefault();
    console.log(confirmpass, "confirmpass");
    if (isSignUp && data.confirmpass) {
      if (data.password !== data.confirmpass) {
        console.log("  setConfirmpass(false);");
        setConfirmpass(false);
        confirmpas = false;
      }
    }
    if (isSignUp && confirmpas) {
      try {
        dispatch(showloading());
        console.log(data, "dataaaa");

        // Sending the request to register a new user
        const response = await axios.post("/auth/register", data);

        // Logging the response from the server
        console.log("responresponse.data.messagese");

        dispatch(hideloading());

        if (response.data.success) {
          toast.success(response.data.message);
          toast("redirecting to login page");
          setIsSignUp(false);
        } else {
          console.log("Error in response:", response);
          toast.error(response.data.message);
        }

        console.log("Response received", response);
      } catch (error) {
        dispatch(hideloading());

        // Logging the error to understand what went wrong
        console.error("Request failed", error);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      try {
        dispatch(showloading());
        console.log(data, "data in login");
        if (!data.password) {
          setError("password required");
        }
        if (!data.username) {
          setError("username required");
        }
        const response = await axios.post("/auth/login", data);
        dispatch(hideloading());
        if (response.data.success) {
          toast.success(response.data.message);
          toast("redirecting to home page");
          console.log(response, "respons");
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        } else {
          console.log(response, "errorrr");
          toast.error(response.data.message);
        }
        console.log(response, "response vanna");
      } catch (error) {
        dispatch(hideloading());
        toast.error("something went wrong");
      }
    }
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        {" "}
        ``
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>Fuse</h1>
          <h6>connecting together</h6>
        </div>
      </div>
      {/* right side */}
      <div>{isSignUp ? SignUp() : Login()}</div>
    </div>
  );
  //login
  function Login() {
    return (
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3 style={{ color: "#008080" }}>Login</h3>

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp(true);
                setData({});
              }}
            >
              Don't have an account? Register!
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
  //SignUp
  function SignUp() {
    return (
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3 style={{ color: "#008080" }}>Sign Up</h3>
          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange={handleChange}
              value={data.firstname}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange={handleChange}
              value={data.lastname}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="email"
              className="infoInput"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="infoInput"
              name="confirmpass"
              onChange={handleChange}
              value={data.confirmpass}
            />
          </div>
          <span
            style={{
              display: confirmpass ? "none" : "block",
              color: "red",
              fontSize: "14px",
              alignSelf: "flex-end",
            }}
          >
            *confirm password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp(false);
                setData({});
              }}
            >
              Already have an account? Login!
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

//endss

export default Auth;
