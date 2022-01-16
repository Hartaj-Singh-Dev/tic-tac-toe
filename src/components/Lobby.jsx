import React, { useState, useEffect , useRef } from "react";
import Board from "./Board";
import Stats from "./Stats";
import Message from "./Message";
import socket from "./../apis/Port";
import Announcement from "./Announcement";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/lobby.css";
import "./styles/Game.css";
import Spinner from "./Spinner";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';


const Game = (props) => {
  const [annoucmnet, setannoucmnet] = useState(false);
  const [message, setmessage] = useState("");
  const [OpponentDisconnected, setOpponentDisconnected] = useState(false);
  const [isvisible, setisVisible] = useState(false);
  const [messageInput , setInput] = useState("");
  const [chatmessages,setchatmessages] = useState([]);

  const MessageContRef = useRef(null)

  const playagain = () => {
    setannoucmnet(false);
    setisVisible(false);
  };

  useEffect(() => {
    socket.on("announcement", (text) => {
      switch (text) {
        case "player_one":
          if (props.isPlayer_one) {
            setannoucmnet(true);
            setmessage("You Won !! 🥳 ");
            setisVisible(true);
          } else {
            setannoucmnet(true);
            setmessage("You Lost!! 🥺");
            setisVisible(true);
          }
          break;

        case "player_two":
          if (props.isPlayer_one) {
            setannoucmnet(true);
            setmessage("You Lost!! 🥺");
            setisVisible(true);
          } else {
            setannoucmnet(true);
            setmessage("You Won!! 🥳 ");
            setisVisible(true);
          }
          break;

        case "tie":
          setannoucmnet(true);
          setmessage("Tie");
          setisVisible(true);
      }
    });

    socket.on("user-disconnected", () => {
      setOpponentDisconnected(true);
    });

    return () => {
      socket.off("user-disconnected");
      socket.off("announcment");
      socket.off("message-received")
    };
  }, []);  

  useEffect(() => {
    socket.on("message-received", (data)=>{ 
    setchatmessages([...chatmessages , data]) 
    setInput("")

    }) 
    return () => {
      socket.off("message-received")
    }
  }, [chatmessages])

  useEffect(() => {
   if(MessageContRef && MessageContRef.current){
     console.log(MessageContRef);
     const element = MessageContRef.current;
     element.scroll({top:element.scrollHeight , left:0 , behavior:"smooth"})
   } 
  }, [MessageContRef , chatmessages])
 

  const updatingValue =(e)=>{
    const value = e.target.value;

    setInput(value)
  } 
 


  const gamestate = props.gamestate;

  const sendMessage = (e) =>{
    e.preventDefault();
    const playerName =  props.isPlayer_one ? gamestate.p1_name : gamestate.p2_name
    console.log(playerName);
    socket.emit("message",playerName , messageInput, gamestate.roomName)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {OpponentDisconnected && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          
              position: "absolute",
              left: "0%",
              top: "0%",
              width: "100%",
            }}
          >
            <div className="disconnected-component">
              <h2>Opppoent disconnected 🥺</h2>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {!OpponentDisconnected && (
        <div className="game">
          <div className="board-container">
            <Board gamestate={gamestate} isPlayer_one={props.isPlayer_one} />
          </div>
          <div className="chat-and-leaderboared">
            <div className="stats-container">
              {annoucmnet && <Announcement>{message}</Announcement>}
              {!annoucmnet && (
                <Stats
                  gamestate={gamestate}
                  isPlayer_one={props.isPlayer_one}
                />
              )}
              {isvisible ? (
                <button
                  className="playagainButton"
                  onClick={() => {
                    playagain();
                  }}
                >
                  Play Again
                </button>
              ) : null}
            </div>
            <div className="chat-box">
              <div className="chat-Header">
                  <h2>Chat Messages</h2>
              </div>
              <div className="chat-messages" ref={MessageContRef}>
               {chatmessages.map((items)=>{
                   return  <Message id={items.id} Time={items.time} userName={items.playerName} Message={items.Message}/>
               })} 
              </div>
              <div className="chat-input">
                <form onSubmit={(e)=>{sendMessage(e)}}>
                  <input  type="text" value={messageInput} onChange={(e)=>{updatingValue(e)}} className={messageInput} placeholder="Enter Message" required />
                  <button type="submit" >
                     <IconButton>
                  <SendIcon style={{color:"#FF4700"}}/>
              </IconButton></button> 
                  </form> 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Waiting = (props) => {
  return (
    <div className="waiting_Area">
      <h2 className="waiting-area-TextHeader">Waiting for someone to join</h2>
      <p>you can copy the RoomName by clicking on Button and send to other player 👇 </p>
      <Spinner />
      <button
        onClick={() => {
          navigator.clipboard.writeText(props.code);
        }}
      >
        {props.code}
      </button>
    </div>
  );
};

const Lobby = (props) => {
  const [isPlayer_one, setisPlayer_one] = useState(props.is_Player_one);
  const [code, setCode] = useState(props.code);
  const [gamestate, setgamestate] = useState(props.gamestate);

  useEffect(() => {
    setisPlayer_one(props.is_Player_one);
  }, [props.is_Player_one]);

  useEffect(() => {
    setgamestate(props.gamestate);
  }, [props.gamestate]);

  useEffect(() => {
    setCode(props.code);
  }, [props.code]);

  useEffect(() => {
    socket.on("update", (gamestate) => {
      setgamestate(gamestate);
    });
    return () => {
      socket.off("update");
    };
  }, []);

  return (
    <React.Fragment>
      {props.waiting && <Waiting code={code} />}
      {!props.waiting && (
        <Game gamestate={gamestate} isPlayer_one={isPlayer_one} />
      )}
    </React.Fragment>
  );
};

export default Lobby;
