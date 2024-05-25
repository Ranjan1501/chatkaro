// UserItem.js
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";

function UserItem({ user, onSelectUser }) {
  return (
    <div className="user-item" onClick={() => onSelectUser(user._id)}>
      <IconButton className="icon-btn">
        <PersonIcon />
      </IconButton>
      <div>
        <h3> {user.name}</h3>
        <p> {user.mobile}</p>
      </div>
    </div>
  );
}

export default UserItem;
