import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import Tasks from "./pages/Tasks";
import ProjectModal from "./modals/ProjectModal";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import AuthContext from "./context/AuthContext";
import Profile from "./pages/Profile";

function App() {
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const ProjectModalHandlier = (value) => {
    setIsOpenProjectModal(value);
  };

  return (
    <>
      <AuthContext>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route
                path="/"
                element={<Dashboard modalHandlier={ProjectModalHandlier} />}
              />
              <Route path="/add-project" element={<AddProject />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quotes" element={<div>Quotes</div>} />
            </Route>

            <Route
              path="*"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <h1>Not Found 404</h1>
                </div>
              }
            />
          </Routes>
        </Router>
        <ProjectModal
          isOpen={isOpenProjectModal}
          modalHandlier={ProjectModalHandlier}
        />
      </AuthContext>
    </>
  );
}

export default App;
