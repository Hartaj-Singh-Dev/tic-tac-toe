import "./styles/Message.css";

const Message = (props) => {
	
	return (
		<>
			<div className="message">
				<div className="message-header">
					<h2>{props.userName}</h2>
					<h2>{props.Time}</h2>
				</div>
				<div className="message-body">
					<p>{props.Message}</p>
				</div>
			</div>
		</>
	)
}

export default Message;
