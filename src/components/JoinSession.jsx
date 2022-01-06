import React, { useEffect, useState } from "react";
import socket from "./../apis/Port";
import "./styles/joinSession.css"

const JoinSession = () => {
	const [data, setData] = useState({
		"code":"",
		"name":"",
		invalid:false,
	})

	const updateData = (e)=>{
		setData({...data,[e.target.name]:e.target.value})
	}

	const submitData = (event)=>{
		event.preventDefault()
		if(data.code !== "" && data.name !== ""){
			socket.emit("joinRoom" , data.name, data.code)
			
		}else{
			alert("fill out the data")
			
		}
	
	}

  useEffect(() => {
	  socket.on("invalid-code",()=>{
		  setData({invalid:true})
	  })
  }, []);
  
  return (
    <React.Fragment>
      <div className="join-Session">
        <div className="Inputs">
          <form onSubmit={(e)=>{submitData(e)}} >
            <input type="text" name="name" value={data.name} placeholder="userName" onChange={(e)=>{updateData(e)}}/>
            <input type="text" name="code" value={data.code} placeholder="RoomName" onChange={(e)=>{updateData(e)}}/>
            <button type="submit">Join Session</button>
          </form>
	  {data.invalid && <p className="Error-from-server">Invalid Code</p>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default JoinSession;
