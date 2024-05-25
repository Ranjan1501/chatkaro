// GroupItem.js
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { IconButton } from "@mui/material";

function GroupItem({ group, onSelectGroup }) {
  return (
    <div className="group-item" onClick={() => onSelectGroup(group._id)}>
      <IconButton className="icon-btn">
        <GroupAddIcon />
      </IconButton>
      <div>
        <h3> {group.name} </h3>
      </div>
    </div>
  );
}

export default GroupItem;
