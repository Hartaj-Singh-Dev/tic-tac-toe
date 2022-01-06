import React, { useState} from "react";
import socket from "./../apis/Port";
import "./styles/createSession.css"

const CreateSession = () => {
	const [createrData, setcreaterData] = useState({
		userName:"",
		roomName:""
	})
	
	const Handledata = (e)=>{
		setcreaterData({...createrData, [e.target.name]:e.target.value})
	}
	const createsession =(e)=>{
		e.preventDefault()
		if(createrData.roomName !== "" && createrData.userName !== ""){
			socket.emit("createRoom",createrData.userName , createrData.roomName)             
		}else{
		}
	}
	
  return (
    <React.Fragment>
      <div className="session-Page">
        <div className="inputforms">
          <form onSubmit={(e)=>{createsession(e)}} >
            <input type="text" name="userName" placeholder="username" value={createrData.userName} onChange={(e) =>{Handledata(e)}} />
            <input type="text" name="roomName"  placeholder="RoomName" value={createrData.roomName} onChange={(e) =>{Handledata(e)}} />
	    <button type="submit">Create & Join</button>       
	  </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateSession;
