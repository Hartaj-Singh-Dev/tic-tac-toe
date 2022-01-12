import io from "socket.io-client";

const port =  "http://localhost:8000"

const socket = io(port);

export default socket;