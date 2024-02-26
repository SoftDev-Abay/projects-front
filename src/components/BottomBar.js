import React from "react";
import "./BottomBar.scss";
import { FaTable, FaPlus, FaTasks, FaComment } from "react-icons/fa";
const BottomBar = (props) => {
  const pathname = window.location.pathname; // returns the path of the current page

  return (
    <nav className="nav-bottombar">
      <div className="section-links-wrapper">
        <a href="/" className={pathname === "/" ? "active" : ""}>
          <FaTable className="icon" />
        </a>
        <a
          href="/add-project"
          className={pathname === "/add-project" ? "active" : ""}
        >
          <FaPlus className="icon" />
        </a>
        <a href="tasks" className={pathname === "/tasks" ? "active" : ""}>
          <FaTasks className="icon" />
        </a>
        <a href="chat" className={pathname === "/chat" ? "active" : ""}>
          <FaComment className="icon" /> <span>Chat</span>
        </a>
      </div>
    </nav>
  );
};

export default BottomBar;
