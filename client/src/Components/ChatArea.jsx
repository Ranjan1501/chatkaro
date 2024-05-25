import React from "react";
import "./style.css";

export default function ChatArea({ messages }) {
  return (
    <div className="chat-area">
      {messages.length === 0 ? (
        <div className="no-messages">
          Select a user or group to start chatting.
        </div>
      ) : (
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
