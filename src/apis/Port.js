import io from "socket.io-client";

const port = process.env.REACT_APP_BACKEND_LINK

const socket = io(port);

export default socket;