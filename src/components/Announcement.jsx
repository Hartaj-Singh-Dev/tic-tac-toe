import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Partcles from "./Partcles"

const Announcement = (props) => {
  return (
    <React.Fragment>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        > 
          {/* {!props.children === "You Won!! 🥳 " ? <h3 className="annoucmentOnWONLOSE">{props.children}</h3>: <><h3 className="annoucmentOnWONLOSE">{props.children}</h3><Partcles/></>} */}
          <h3 className="annoucmentOnWONLOSE">{props.children}</h3>
          {props.hasWon ? <Partcles/> : null}
	</motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Announcement;
