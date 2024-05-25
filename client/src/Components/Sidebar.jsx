// import React from "react";
// import "./style.css";
// import PersonIcon from "@mui/icons-material/Person";
// import SearchIcon from "@mui/icons-material/Search";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import Icon from "@mui/material/IconButton";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// export default function Sidebar() {
//   return (
//     <div className="sidebar-container">
//       <div className="sb-header">
//         {/* <div className="sb-icons"> */}
//         <button className="btn">
//           <PersonIcon />
//         </button>

//         <button className="btn">
//           <PersonAddAltIcon />
//         </button>
//         <button className="btn">
//           <GroupAddIcon />
//         </button>
//         {/* </div> */}
//       </div>
//       <div className="sb-search">
//         <button className="btn">
//           <SearchIcon />
//         </button>
//         <input type="text" placeholder="Search" className="search-box" />
//       </div>
//       <div className="sb-header">
//         <button className="btn">
//           <QuestionAnswerIcon />
//         </button>
//         <button className="btn">
//           <AddCircleOutlineIcon />
//         </button>
//       </div>
//       {/* conversation */}
//     </div>
//   );
// }
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
    // Fetch users and groups from the API
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.user)) {
          setUsers(data.user);
        } else {
          console.error("Unexpected user data format:", data);
        }
      });

    fetch("http://localhost:4000/api/groups")
      .then((response) => response.json())
      .then((data) => {
        // console.log("data set to Group: ", data);
        // setGroups(data);
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
        <h3>Users</h3>
        {users.map((user) => (
          <UserItem key={user._id} user={user} onSelectUser={onSelectUser} />
        ))}
      </div>
      <div className="sb-groups">
        <h3>Groups</h3>
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
