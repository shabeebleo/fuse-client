import axios from "axios";
const baseURL = "https://fuse-backend.onrender.com";
// const baseURL = "http://localhost:5000";
const instance = axios.create({ baseURL: baseURL });
export default instance;
