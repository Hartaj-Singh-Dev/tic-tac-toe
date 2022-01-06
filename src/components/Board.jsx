import React from "react";
import Square from "./Square";


const Board = (props) => {
  
  //  playerMove = (index) =>{
  //   if(p1_turn === isPlayer_one && grid[index] === 0){
  //     if(isPlayer_one){
  //       socket.emit("player-move" , index , 1);
  //     }
  //     else{
  //       socket.emit("player-move" , index , -1)
  //     }
  //   }
  // }

  const gamestate = props.gamestate;
  console.log(gamestate)
  return (
    <React.Fragment>
      <div className="board">
        {gamestate.grid.map((value, index) => {
	      return <Square key={index} val={value.toString()}  gamestate={{isPlayer_one:props.isPlayer_one , index: index , ...gamestate}}/>
      })}</div>
    </React.Fragment>
  );
};

export default Board;
