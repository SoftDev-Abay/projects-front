import { React, useState } from "react";
import "./RightSidebar.scss";
import { useEffect } from "react";
import { getAllUsers } from "../utility/getAllUsers";

const RightSidebar = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  return (
    <nav className="nav-rightsidebar">
      <div className="title">
        <span>all users</span>
      </div>
      <div className="hr-wrapper">
        <hr />
      </div>
      <ul className="users-wrapper">
        {users.map((user) => (
          <li>
            <img
              src={
                user.avatar_name != null
                  ? `http://localhost:5555/images/${user.avatar_name}`
                  : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              }
              alt=""
            />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RightSidebar;
