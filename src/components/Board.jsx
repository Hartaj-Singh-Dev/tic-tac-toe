import React from "react";
import Square from "./Square";


const Board = (props) => {
  const gamestate = props.gamestate;
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
