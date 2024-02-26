import React, { useEffect } from "react";
import Topbar from "./Topbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import BottomBar from "./BottomBar";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Layout = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const chat = currentPath === "/chat";

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user && currentPath !== "/login") {
      navigate("/login");
    }
  }, [user]);

  if (!user && currentPath !== "/login") {
    <>
      <p>loading...</p>
    </>;
  } else {
    return (
      <main className="main">
        <LeftSidebar />
        <section className="main-container">
          {!chat && <Topbar />}
          <div
            className="main-container-content"
            style={
              chat
                ? { marginTop: "0px", padding: "0px", marginBottom: "0px" }
                : {}
            }
          >
            <Outlet />
          </div>
          <BottomBar />
        </section>
        <RightSidebar />
      </main>
    );
  }
};

export default Layout;
