import React from "react";
import "./LeftSidebar.scss";
import { FaTable, FaPlus, FaTasks, FaComment, FaUser } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
const LeftSidebar = (props) => {
  const pathname = window.location.pathname; // returns the path of the current page
  const { user } = useAuthContext();

  return (
    <nav className="nav-leftsidebar">
      <div className="img-wrapper">
        <img
          src={
            user.avatar_name != null
              ? `http://localhost:5555/images/${user.avatar_name}`
              : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          }
          alt=""
        />
        <span>{user.username}</span>
      </div>
      <div className="section-links-wrapper">
        <a href="/" className={pathname === "/" ? "active" : ""}>
          <FaTable className="icon" /> <span>Dashboard</span>
        </a>
        <a
          href="/add-project"
          className={pathname === "/add-project" ? "active" : ""}
        >
          <FaPlus className="icon" />
          <span>Add Project</span>
        </a>
        <a href="tasks" className={pathname === "/tasks" ? "active" : ""}>
          <FaTasks className="icon" /> <span>Tasks</span>
        </a>
        <a href="chat" className={pathname === "/chat" ? "active" : ""}>
          <FaComment className="icon" /> <span>Chat</span>
        </a>
        <a href="profile" className={pathname === "/profile" ? "active" : ""}>
          <FaUser className="icon" /> <span>Profile</span>
        </a>
      </div>
    </nav>
  );
};

export default LeftSidebar;
