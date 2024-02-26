import { React, useEffect, useState } from "react";
import "./Dashboard.scss";
import ProjectCard from "../components/ProjectCard";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = ({ modalHandlier }) => {
  const { user } = useAuthContext();
  const [userProjects, setUserProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentFilterCategory, setCurrentFilterCategory] = useState("all");
  const getUserProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:5555/projects/user/${user._id}`
      );
      const data = await response.json();
      setUserProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  useEffect(() => {
    const allCategories = userProjects.map((project) => project.category);
    setCategories(allCategories);
  }, [userProjects]);

  console.log(userProjects);

  return (
    <section className="section-dashboard">
      <div className="filter-container">
        <span className="title">Filter by:</span>
        <div className="filter-items-wrapper">
          <span
            className="filter-item"
            onClick={() => setCurrentFilterCategory("all")}
          >
            all
          </span>
          {categories.map((category) => (
            <span
              className="filter-item"
              onClick={() => setCurrentFilterCategory(category)}
            >
              {category}
            </span>
          ))}

          <span className="filter-item filter-item-last">last</span>
        </div>
      </div>
      <div className="projects-container">
        {userProjects
          .filter(
            (project) =>
              currentFilterCategory == "all" ||
              project.category == currentFilterCategory
          )
          .map((project) => {
            return (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.name}
                description={project.description}
                status="status"
                type={project.category}
                owner={
                  project.members.filter(
                    (member) => member.role == "owner" || member.role == "Owner"
                  )[0]
                }
                members={project.members}
                date={project.date_created.split("T")[0]}
                deadline={project.date_due}
                bannerImgs={project.bannerImgs}
                modalHandlier={modalHandlier}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Dashboard;
