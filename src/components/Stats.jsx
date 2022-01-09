import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Stats = (props) => {

	let centeredStyle = {
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
    color:"rgb(0, 204, 255)"
	}

  const gamestate = props.gamestate;
  const isPlayer_one = props.isPlayer_one;
  const opponent_name = isPlayer_one ? gamestate.p2_name : gamestate.p1_name;
  const wins = isPlayer_one ? gamestate.p1_score : gamestate.p2_score;
  const losses = isPlayer_one ? gamestate.p2_score : gamestate.p1_score;
  const ties = gamestate.ties;

  return (
    <React.Fragment>
      <AnimatePresence>
        <motion.div
          className="stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {gamestate.p1_turn === isPlayer_one && (
            <div className="turn" style={{color:"rgb(0,244,255)"}}>
              {" "}
              <h5>Your Turn</h5>
            </div>
          )}
          {gamestate.p1_turn !== isPlayer_one && (
            <div
              className="turn"
              style={{ display: "grid", gridTemplateRows: "1fr 1fr" , color:"rgb(0,244,255)"}}
            >
              {" "}
              <h5>{opponent_name}'s Turn</h5>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               
              </div>
            </div>
          )}

	  <div style={{width:"100%" , height:"100%" ,display:"grid" , gridTemplateRows:"1fr 1fr" , gridTemplateColumns:"1fr 1fr 1fr"}}>
		<div style={centeredStyle}>
			<p>Wins</p>
		</div>
		<div style={centeredStyle}>
			<p>Ties</p>
		</div>
		<div style={centeredStyle}>
			<p>Losses</p>
		</div>
		<div style={centeredStyle}>
			<p>{wins}</p>
		</div>
		<div style={centeredStyle}>
			<p>{ties}</p>
		</div>
		<div style={centeredStyle}>
			<p>{losses}</p>
		</div>
	  </div>

        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Stats;
