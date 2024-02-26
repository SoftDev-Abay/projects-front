import { React, useState, useRef, useEffect } from "react";
import "./AddProject.scss";
import { FaPlus } from "react-icons/fa";
import { getAllUsers } from "../utility/getAllUsers";
import axios from "axios";
import Carousel from "../components/Carousel";
const AddProject = () => {
  const [members, setMembers] = useState([]);
  const memberRoleSelect = useRef(null);
  const memberSelect = useRef(null);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const date_dueRef = useRef(null);
  const categoryRef = useRef(null);
  const bannerImgRef = useRef(null);
  const [bannerImgUrls, setBannerImgUrls] = useState([]);
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
  }, []); // Empty dependency array means this effect runs once on mount

  const onAddProjectSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const date_created = new Date().toISOString().slice(0, 10);
    const date_due = date_dueRef.current.value;
    const category = categoryRef.current.value;
    const banner_imgs = bannerImgUrls;
    const newProject = {
      name,
      description,
      date_created,
      date_due,
      category,
      members,
      banner_imgs,
    };

    if (
      name === "" ||
      description === "" ||
      date_due === "" ||
      category === "" ||
      banner_imgs.length < 1 ||
      members.length < 1
    ) {
      alert(
        "Please fill out all fields and add at least one member and banner image"
      );
      return;
    }

    const responce = await axios.post(
      "http://localhost:5555/projects",
      newProject
    );

    nameRef.current.value = "";
    descriptionRef.current.value = "";
    date_dueRef.current.value = "";
    categoryRef.current.value = "";
    bannerImgRef.current.value = "";
    setBannerImgUrls([]);
    setMembers([]);
  };

  const AddMember = () => {
    const memberName = memberSelect.current.value;
    const role = memberRoleSelect.current.value;
    const newMember = {
      username: memberSelect.current.value,
      role: memberRoleSelect.current.value,
    };
    if (
      memberName !== "" &&
      members.filter((member) => member.username === memberName).length < 1
    ) {
      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
    }
  };

  console.log(bannerImgUrls);

  return (
    <section className="addproject-section">
      <h3>Create new project</h3>
      <form onSubmit={(e) => onAddProjectSubmit(e)}>
        <div className="form-group">
          <label htmlFor="project-name">Project name</label>
          <input required type="text" id="project-name" ref={nameRef} />
        </div>
        <div className="form-group">
          <label htmlFor="project-description">Project description</label>
          <textarea
            name=""
            id="project-description"
            cols="30"
            rows="10"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Due date:</label>
          <input required type="date" id="deadline" ref={date_dueRef} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Project category:</label>
          <select name="" id="category" ref={categoryRef}>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="members-add">
          <label htmlFor="project-members">Assign to:</label>
          <label htmlFor="project-members">Role:</label>
          <label htmlFor="project-members"></label>
          <select ref={memberSelect}>
            {users.map((user) => (
              <option value={user.username}>{user.username}</option>
            ))}
          </select>
          <select ref={memberRoleSelect}>
            <option value="Owner">Owner</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Member">Member</option>
          </select>
          <button type="button" className="btn btn-green" onClick={AddMember}>
            <FaPlus className="icon" />
          </button>
        </div>
        <div className="members-show">
          {members?.map((member, index) => {
            let random_id = Math.floor(Math.random() * 100);
            return (
              <img
                src={`https://randomuser.me/api/portraits/men/${random_id}.jpg`}
                alt={member}
                onClick={() => {
                  const updatedMembers = members.filter(
                    (memberFilter, indexFilter) => indexFilter != index
                  );
                  setMembers(updatedMembers);
                }}
              />
            );
          })}
        </div>
        <div className="add-banner-img">
          <p className="title">Add banner image:</p>
          <div className="controls">
            <input type="text" placeholder="Link to img" ref={bannerImgRef} />
            <button
              type="button"
              className="btn btn-green"
              onClick={() => {
                const imgLink = bannerImgRef.current.value;
                if (imgLink !== "") {
                  const updatedBannerImgUrls = [...bannerImgUrls, imgLink];
                  setBannerImgUrls(updatedBannerImgUrls);
                  bannerImgRef.current.value = "";
                }
              }}
            >
              <FaPlus className="icon" />
            </button>
          </div>
          <div className="banner-imgs">
            {bannerImgUrls.map((img, index) => {
              return (
                <img
                  key={index} // Adding a key here for React's list rendering
                  src={img}
                  alt={`banner ${index}`}
                  onClick={() => {
                    const updatedBannerImgUrls = bannerImgUrls.filter(
                      (imgFilter, indexFilter) => indexFilter !== index
                    );
                    setBannerImgUrls(updatedBannerImgUrls);
                  }}
                />
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn btn-submit">
          Add project
        </button>
      </form>
    </section>
  );
};

export default AddProject;
