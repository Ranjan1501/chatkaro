// import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { IconButton } from "@mui/material";

import React from "react";
import "./style.css";

export default function GroupItem({ group, onSelectGroup }) {
  return (
    <div className="group-item" onClick={() => onSelectGroup(group._id)}>
      <IconButton className="icon-btn">
        <GroupAddIcon />
      </IconButton>
      <div className="group-details">
        <div className="group-name">
          <h3> {group.name}</h3>
        </div>
      </div>
    </div>
  );
}
