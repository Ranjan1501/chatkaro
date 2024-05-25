import React, { useState, useEffect } from "react";
import "./style.css";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

export default function MainContainer() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    setSelectedGroupId(null); // Deselect group when user is selected
  };

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
    setSelectedUserId(null); // Deselect user when group is selected
  };

  console.log("selectedUserId: ", selectedUserId);
  console.log("selectedGroupId: ", selectedGroupId);
  useEffect(() => {
    if (selectedUserId) {
      // Fetch user messages

      fetch(`http://localhost:4000/api/messages/user/${selectedUserId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.messages)) {
            console.log("user message: ", data.messages);
            setMessages(data.messages);
          } else {
            console.error("Unexpected group data format:", data);
          }
          // setMessages(data.messages);
        })
        .catch((error) =>
          console.error("Error fetching user messages:", error)
        );
    } else if (selectedGroupId) {
      // Fetch group messages
      fetch(`http://localhost:4000/api/messages/group/${selectedGroupId}`)
        .then((response) => response.json())
        .then((data) => {
          // setMessages(data);
          if (Array.isArray(data.messages)) {
            console.log("group message: ", data.messages);
            setMessages(data.messages);
          } else {
            console.error("Unexpected group data format:", data);
          }
        })
        .catch((error) =>
          console.error("Error fetching group messages:", error)
        );
    }
  }, [selectedUserId, selectedGroupId]);

  console.log("messages: ", messages);

  return (
    <div className="main-container">
      <Sidebar
        onSelectUser={handleSelectUser}
        onSelectGroup={handleSelectGroup}
      />
      <ChatArea messages={messages} />
    </div>
  );
}
