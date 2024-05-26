import React, { useEffect, useState } from "react";
import "./style.css";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UserItem from "./UserItem";
import GroupItem from "./GroupItem";

export default function Sidebar({ onSelectUser, onSelectGroup }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Unexpected user data format:", data);
        }
      });

    fetch("http://localhost:4000/api/groups")
      .then((response) => response.json())
      .then((data) => {
        console.log("data set to Group: ", data);
        setGroups(data);
        if (Array.isArray(data.rooms)) {
          setGroups(data.rooms);
        } else {
          console.error("Unexpected group data format:", data);
        }
      });
  }, []);

  console.log("users: ", users);
  console.log("groups: ", groups);

  return (
    <div className="sidebar-container">
      <div className="sb-header">
        <IconButton className="icon-btn">
          <PersonIcon />
        </IconButton>
        <div className="sb-icons">
          <IconButton className="icon-btn">
            <PersonAddAltIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton className="icon-btn">
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder="Search" className="search-box" />
      </div>
      <div className="sb-users">
        {/* <h3>Users</h3> */}
        {users.map((user) => (
          <UserItem key={user._id} user={user} onSelectUser={onSelectUser} />
        ))}
      </div>
      <div className="sb-groups">
        {/* <h3>Groups</h3> */}
        {groups.map((group) => (
          <GroupItem
            key={group._id}
            group={group}
            onSelectGroup={onSelectGroup}
          />
        ))}
      </div>
    </div>
  );
}
