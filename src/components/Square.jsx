import React from 'react'
import socket from './../apis/Port'

const Square = (props) => {

	const renderValue = (val)=>{
		if(val === '1'){
			return "X"
		}
		else if(val === "-1"){
			return "O"
		}
		else{
			return null
		}
	}

	const playerMove =(e , gamestate)=>{
		if(gamestate.p1_turn === gamestate.isPlayer_one && gamestate.grid[gamestate.index] === 0){
			if(gamestate.isPlayer_one){
				socket.emit("playerMove" ,gamestate.roomName , gamestate.index , 1);
				console.log("X")
			}
			else{
				socket.emit("playerMove",gamestate.roomName ,gamestate.index , -1);
				console.log("O");
			}
		}
	}

	const gamestate = props.gamestate;
	console.log(gamestate);
	return (
		<React.Fragment>
		<div className="square-inner" onClick={(e)=>{playerMove(e , gamestate)}}>
			{renderValue(props.val)}
		</div>	
		</React.Fragment>
	)
}

export default Square;
