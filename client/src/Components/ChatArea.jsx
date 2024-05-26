import React, { useState } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

export default function ChatArea({ messages, onSendMessage }) {
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      onSendMessage(userMessage);
      setUserMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-area">
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message-box">
              <p>{msg.message}</p>
            </div>
          ))
        ) : (
          <div className="no-messages">
            {" "}
            Select a user or group to start chatting.
          </div>
        )}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="message..."
        />
        <IconButton className="message-send-btn">
          <SendIcon id="send" onClick={handleSendMessage} />
        </IconButton>
      
      </div>
    </div>
  );
}
