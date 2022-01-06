import io from "socket.io-client";
// import dotenv from "dotenv";

// dotenv.config({path:"../../config.env"})

const port = process.env.REACT_APP_BACKEND_LINK//need to change before deployment to production

const socket = io(port);
export default socket;