import React, { useCallback, useEffect, useRef } from "react";
import "./styles/modal.css";
import gsap, { Power3 } from "gsap";
import socket from "./../apis/Port";

const Modal = (props) => {
	const [Error , setError] = React.useState("")
  const ModalDesign = () => {
    let modaldesign = useRef(null);

    const handleVisibility = useCallback(
      (event) => {
        props.onclick(!props.showModal);
      },
      [props.onclick]
    );
    useEffect(() => {
      gsap.to(modaldesign, { duration: 0.1, ease: Power3.easeOut, y: 20 });
    }, []);

    useEffect(()=>{
	    socket.on("Error",(data)=>{
		    setError(data)
           })
	   
	   return () =>{
		   socket.off("Error")
	   }
    },[])

    return (
      <React.Fragment>
        <div ref={(el) => { modaldesign = el; }} className="Modal" >
          <div className="modalheader">
            <i class="fas fa-times fa-7x" onClick={handleVisibility}></i>
          </div>
          <div className="modalBody">{props.modalBody}</div>
	  <div className="Error">
	   {Error}
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>{props.showModal ? <ModalDesign /> : null}</React.Fragment>
  );
};

export default Modal;
