import React from "react";
import { useState } from "react";
import "./styles/landing.css";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal"
import CreateSession from "./CreateSession";
import JoinSession from "./JoinSession";

const Landing = () => {
  
  const [modal_create, setModal_create] = useState(false);
  const [modal_join, setModal_join] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const create_toggle = () => {
    setModal_create(!modal_create);
  };
  const join_toggle = () => {
    setModal_join(!modal_join);
  };

  
  return (
    <React.Fragment>
      <AnimatePresence>
        <motion.div>
          <div className="HomePage">
            <div className="centered-container">
              <div className="header">
                <h1 className="tictactoeHead">Tic Tac Toe</h1>
              </div>
              <div className="createSession">
                <button onClick={create_toggle}  className="ButtonsMans">Create Game</button>
                 <Modal showModal={modal_create} onclick={setModal_create} modalBody={<CreateSession/>} /> 
                  </div>
              <div className="joinSession">
                <button onClick={join_toggle} className="ButtonsMans">Join Game</button>
              <Modal showModal={modal_join} onclick={join_toggle} modalBody={<JoinSession/>} /> 
                 
              </div>
              <div className="credentials">
                <h1 className="name-link">
                  Made with <span> <i class="fas fa-heart"></i> </span> by{" "}
                  <a href="https://thehartajsingh05.web.app/" target="_blank" rel="noreferrer noopener">
                    Hartaj 
                  </a>
                </h1>
               
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};
export default Landing;
