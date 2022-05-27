import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ImgSocket } from "./socket";

function App() {
  const [image, setImage] = useState<string>();
  const socketRef = useRef<ImgSocket>();
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [socketState, setSocketState] = useState<string>("Подключение...");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const socket = new ImgSocket(handleImage, handleSocketState);
    socketRef.current = socket;
  }, []);

  function handleSocketState(event: Event) {
    console.log(event.type)
    switch (event.type) {
      case "open":
        setSocketState("Подключение установлено.");
        break;
      case "error":
        setSocketState("Невозможно подключиться.");
        break;
      case "close":
        setSocketState("Подключение закрыто.");
    }
  }

  function handleImage(msg: MessageEvent) {
    if (msg.data instanceof String) {
      setMessage(msg.data.toString());
    } else if (msg.data instanceof Blob) {
      const blobUrl = URL.createObjectURL(msg.data);
      console.log(blobUrl);
      setImage(blobUrl);
    }
  }

  function sendImageRequest() {
    console.log(input);
    socketRef.current?.sendImageRequest(input);
  }

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{}}>
        <div>{socketState}</div>
        <br></br>
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={sendImageRequest}>Запросить</button>
        <br></br>
        {image ? (
          <img
            style={{ maxHeight: "800px", maxWidth: "800px" }}
            src={image}
          ></img>
        ) : (
          <div>{message}</div>
        )}
      </div>
    </div>
  );
}

export default App;
