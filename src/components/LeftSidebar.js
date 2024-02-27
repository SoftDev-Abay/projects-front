import React from "react";
import "./LeftSidebar.scss";
import {
  FaTable,
  FaPlus,
  FaTasks,
  FaComment,
  FaUser,
  FaBriefcase,
  FaQuoteLeft,
  FaNewspaper,
} from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const LeftSidebar = (props) => {
  const { t } = useTranslation("global");

  const pathname = window.location.pathname; // returns the path of the current page
  const { user } = useAuthContext();

  const links = [
    {
      to: "/",
      icon: <FaTable className="icon" />,
    },
    {
      to: "/add-project",
      icon: <FaPlus className="icon" />,
    },
    {
      to: "/tasks",
      icon: <FaTasks className="icon" />,
    },
    {
      to: "/chat",
      icon: <FaComment className="icon" />,
    },
    {
      to: "/jobs",
      icon: <FaBriefcase className="icon" />,
    },
    {
      to: "/quotes",
      icon: <FaQuoteLeft className="icon" />,
    },
    {
      to: "/headlines",
      icon: <FaNewspaper className="icon" />,
    },
    {
      to: "/profile",
      icon: <FaUser className="icon" />,
    },
  ];

  const linksLabels = t("sidebar", { returnObjects: true });

  return (
    <nav className="nav-leftsidebar">
      <div className="img-wrapper">
        <img
          src={
            user.avatar_name != null
              ? `https://projects-backend-mldr.onrender.com/images/${user.avatar_name}`
              : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          }
          alt=""
        />
        <span>{user.username}</span>
      </div>
      <div className="section-links-wrapper">
        {links.map((link, index) => (
          <a
            key={index + link.to}
            href={link.to}
            className={pathname === link.to ? "active" : ""}
          >
            {link.icon}
            <span>{linksLabels[index].name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default LeftSidebar;
