import "./styles/Message.css";

const Message = (props) => {
	return (
		<>
		    
			<div className={props.userName == props.playerName  ? "message right" : "message left"}>
				<div className="message-body">
					<p>{props.Message}</p>
				</div>
				<div className="message-time">
					<p>{props.Time}</p>
				</div>
			</div>
	
		</>
	)
}

export default Message;
