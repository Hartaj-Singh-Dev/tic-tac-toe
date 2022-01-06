import React,{ useEffect } from 'react';
import { useState } from 'react';
import socket from "./../apis/Port";
import Landing from './Landing';
import Lobby from './Lobby';


const Container = () => {
	const [landing, setlanding] = useState(true);
	const [lobby, setlobby] = useState(false)
	const [p1_one_name , setP1Name] = useState("")	
	const [lobby_waiting, setlobby_waiting] = useState(true)
	const [code , setCode] = useState("")
	const[isPlayer_one , setIsplayerOne]= useState(false)
	const [gameState , setGameState] = useState({
		p1_name: "",
		p2_name:"",
		p1_score:0,
		p2_score:0,
		ties:0,
		p1_turn:true,
		grid:[0 ,0 ,0 ,0 ,0, 0, 0, 0, 0],
		roomName:""
	})
	
	useEffect(() => {
	
		socket.on("room_joined",(Name, code)=>{
			setlanding(false);
			setlobby(true);
			setP1Name(Name);
			setCode(code)
			setIsplayerOne(true)
		})

		socket.on("joined-session", (gameState)=>{
			setlobby_waiting(false);
			setlanding(false);
			setlobby(true)
			setGameState(gameState)
		})


		return()=>{
			socket.off("session-created")
			socket.off("valid-code")
		}
	},[])

	// console.log(gameState);
	const gamestate = gameState
	return (
		<div>
		  {landing && <Landing/>}
		  {lobby && <Lobby gamestate={gamestate} waiting={lobby_waiting} code={code} is_Player_one={isPlayer_one}/>}	
		</div>
	)
}

export default Container;
