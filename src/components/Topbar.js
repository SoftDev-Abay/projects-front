import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.scss";
import { FaProjectDiagram, FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
const Topbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();
  const logout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <nav className="nav-top">
      <div className="nav-top-container">
        <div className="logo-wrapper">
          <FaProjectDiagram size={30} />
          <span>Manager</span>
        </div>
        <button type="button" className="btn btn-logout" onClick={logout}>
          Logout
        </button>
        <FaSignOutAlt className="icon icon-logout" onClick={logout} />
      </div>
    </nav>
  );
};

export default Topbar;
