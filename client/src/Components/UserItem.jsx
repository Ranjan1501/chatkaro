// import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";

import React from "react";
import "./style.css";

export default function UserItem({ user, onSelectUser }) {
  return (
    <div className="user-item" onClick={() => onSelectUser(user._id)}>
      {/* <img src={user.profile_photo} alt={user.name} className="user-avatar" /> */}
      <IconButton className="icon-btn">
        <PersonIcon />
      </IconButton>
      <div className="user-details">
        <div className="user-name">
          <h3> {user.name}</h3>
        </div>
      </div>
    </div>
  );
}
