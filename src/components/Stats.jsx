import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/stats.css"

const Stats = (props) => {

	let centeredStyle = {
		display:"flex",
		alignItems:"center",
		justifyContent:"center",
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
            <div className="turn">
              {" "}
              <h5>Your Turn</h5>
            </div>
          )}
          {gamestate.p1_turn !== isPlayer_one && (
            <div
              className="turn"
              style={{ display: "grid", gridTemplateRows: "1fr 1fr"}}
            >
              {" "}
              <h5>{opponent_name}'s Turn</h5>
            </div>
          )}

	  <div style={{width:"100%" , height:"100%" ,display:"grid" , gridTemplateRows:"1fr 1fr" , gridTemplateColumns:"1fr 1fr 1fr"}}>
		<div  className="statsHeaders" style={centeredStyle}>
			<p>Wins</p>
		</div>
		<div   className="statsHeaders" style={centeredStyle}>
			<p>Ties</p>
		</div>
		<div className="statsHeaders" style={centeredStyle}>
			<p>Losses</p>
		</div>
		<div className="realStats" style={centeredStyle}>
			<p>{wins}</p>
		</div>
		<div className="realStats"  style={centeredStyle}>
			<p>{ties}</p>
		</div>
		<div  className="realStats"  style={centeredStyle}>
			<p>{losses}</p>
		</div>
	  </div>

        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Stats;
