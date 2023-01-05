// import { env } from "@/env/server.mjs";
import axios from "axios";

// Create axios instance.
const axiosInstance = axios.create({
	baseURL: "http://127.0.0.1:8000",
	withCredentials: true,
});

export default axiosInstance;
