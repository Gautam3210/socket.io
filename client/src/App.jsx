import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "react";
import { connect, io } from "socket.io-client";

import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to a server");
    });

    socket.on("userMessage", (data) => {
      console.log("Message from server:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const inputRef = useRef();
  const handleKeyDown = (e) => {
    socket.emit("userMessage", inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div class="chats">
        <ul>
          <li>itms</li>
        </ul>
      </div>
      <footer class="textArea">
        <div style={{ display: "flex", columnGap: "1rem", height: "3rem" }}>
          <div style={{ display: "flex", margin: "0rem", width: "20rem" }}>
            <label for="exampleInputEmail1" class="form-label"></label>
            <input
              ref={inputRef}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              // aria-describedby="emailHelp"
            />
          </div>
          <button class="btn btn-primary" onClick={handleKeyDown}>
            send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
