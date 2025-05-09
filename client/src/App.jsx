import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { connect, io } from "socket.io-client";

import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  let [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const senderRef = useRef()
  const reciverRef = useRef()


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to a server");
    });

    socket.on("userMessage", (data) => {
      console.log(`data from ${data.from}: data message: ${data.message}`);

      setMessages([...messages, data.message]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [messages]);

  const handleKeyDown = (e) => {
    socket.emit("register", senderRef.current.value);

    socket.emit("userMessage", {
      toUserId: reciverRef.current.value,
      message: messageRef.current.value,
    });
    messageRef.current.value = "";
  };

  return (
    <div>
      <div className="chats">
        <ul style={{ padding: "0", margin: "0" }}>
          {messages.map((element) => (
            <li
              style={{
                padding: "10px",
                margin: "0px",
                listStyleType: "none",
                width: "8rem",
              }}
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
      <footer className="textArea">
        <div style={{margin:"1rem", display:"flex", gap:"1rem"}}>
          <label for="sender" className="form-label"></label>
          <input
            ref={senderRef}
            type="text"
            className="form-control"
            id="sender"
            placeholder="sender id"
            // aria-describedby="emailHelp"
          />
          <label for="reciver" className="form-label"></label>
          <input
            ref={reciverRef}
            type="text"
            className="form-control"
            id="reciver"
            placeholder="reciver id"
            // aria-describedby="emailHelp"
          />
        </div>
        <div style={{ display: "flex", columnGap: "1rem", height: "3rem" }}>
          <div style={{ display: "flex", margin: "0rem", width: "20rem" }}>
            <label for="exampleInputEmail1" className="form-label"></label>
            <input
              ref={messageRef}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="message"
              // aria-describedby="emailHelp"
            />
          </div>
          <button className="btn btn-primary" onClick={handleKeyDown}>
            send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
