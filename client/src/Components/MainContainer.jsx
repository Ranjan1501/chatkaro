import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

export default function MainContainer() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setSelectedGroupId(null);
    fetchMessages(`http://localhost:4000/api/messages/user/${userId}`);
  };

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
    setSelectedUserId(null); 
    fetchMessages(`http://localhost:4000/api/messages/group/${groupId}`);
  };

  const fetchMessages = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  const handleSendMessage = (messageContent) => {
    const message = {
      sender_id: localStorage.getItem("sender_id"), 
      receiver_id: selectedUserId ? selectedUserId : null,
      room_id: selectedGroupId ? selectedGroupId : null,
      isGroupMessage: !!selectedGroupId,
      message: messageContent,
    };

    socket.emit("sendMessage", message);

    fetch("http://localhost:4000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="main-container">
      <Sidebar
        onSelectUser={handleSelectUser}
        onSelectGroup={handleSelectGroup}
      />
      <ChatArea messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}
