import { React, useRef, useState, useEffect } from "react";
import "./CreateTaskModal.scss";
import {
  FaGgCircle,
  FaCircle,
  FaCircleNotch,
  FaEllipsisH,
  FaFlag,
  FaComment,
  FaPaperclip,
  FaPlusCircle,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { ImageConfig } from "../config/ImageConfig";
import { getAllUsers } from "../utility/getAllUsers";
import { useAuthContext } from "../context/AuthContext";

const CreateTaskModal = ({ isOpen, modalHandlier }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [userProjects, setUserProjects] = useState(null);
  const { user } = useAuthContext();
  const [members, setMembers] = useState([user.username]);

  const selectMember = useRef(null);
  const taskTitle = useRef(null);
  const taskDescription = useRef(null);
  const subtaskInput = useRef(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    getUserProjects();
  }, []); // Empty dependency array means this effect runs once on mount

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

  const onDragOver = () => {
    wrapperRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };
  const onDrop = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile, newFile.type, newFile.type.split("/")[1]);
    if (newFile) {
      const updatedFileList = [...fileList, newFile];
      setFileList(updatedFileList);
    }
  };

  const fileRemove = (file) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(fileList.indexOf(file), 1);
    setFileList(updatedFileList);
    // console.log(file,fileList,"file removeed list");
  };

  const onTaskStatusChange = (status, index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = status;
    setSubtasks(updatedSubtasks);
  };

  const onTaskCreate = async () => {
    const formData = new FormData();
    formData.append("name", taskTitle.current.value);
    formData.append("description", taskDescription.current.value);

    formData.append("projectName", projectName || userProjects[0].name);
    formData.append("date_created", new Date().toISOString());
    formData.append("status", "ready");
    members.forEach((username, index) => {
      formData.append(`members[${index}]`, username);
    });
    formData.append("subtasks", JSON.stringify(subtasks));

    fileList.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("ownerID", user._id);

    const result = await axios.post("http://localhost:5555/task", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (result.status === 200) {
      console.log("Task created");
    } else {
      console.log("Task not created");
    }
  };
  return (
    <>
      {isOpen && (
        <div className="create-task-modal-container">
          <div className="modal">
            <div className="modal-sandbox"></div>
            <div className="modal-box">
              <div className="modal-header">
                <div
                  className="close-modal"
                  onClick={() => {
                    modalHandlier(false);
                  }}
                >
                  &#10006;
                </div>
                <input
                  className="title-input"
                  type="text"
                  placeholder="Title"
                  ref={taskTitle}
                />
              </div>
              <div className="modal-body">
                <div className="modal-body-header">
                  <div className="tags">
                    <span>
                      <strong>ready</strong>
                    </span>
                    <span>
                      <select
                        className="project-select"
                        name=""
                        id=""
                        value={projectName}
                        onChange={(e) =>
                          setProjectName(
                            e.target.options[e.target.selectedIndex].text
                          )
                        }
                      >
                        {userProjects ? (
                          userProjects?.map((project) => (
                            <option value={project.name}>{project.name}</option>
                          ))
                        ) : (
                          <option value="">Choose a project</option>
                        )}
                      </select>
                    </span>
                  </div>
                  <span className="project-modal-date">
                    {new Date().toISOString().split("T")[0]}
                  </span>
                </div>
                <textarea
                  className="description-textarea"
                  name=""
                  id=""
                  rows="10"
                  placeholder="Description"
                  ref={taskDescription}
                ></textarea>
                <div className="members-container">
                  <div className="members-header">
                    <h3>Members </h3>
                    <select
                      className="add-member-select"
                      name=""
                      ref={selectMember}
                      onChange={(e) => {
                        const selectedMember = e.target.value;
                        if (
                          selectedMember !== "" &&
                          !members.includes(selectedMember)
                        ) {
                          const updatedMembers = [...members, selectedMember];
                          setMembers(updatedMembers);
                        }
                      }}
                    >
                      {userProjects &&
                        (!projectName
                          ? userProjects[0]?.members?.map((user) => {
                              return (
                                <option value={user.username}>
                                  {user.username}
                                </option>
                              );
                            })
                          : userProjects
                              .filter(
                                (projectFilter) =>
                                  projectFilter.name == projectName
                              )[0]
                              .members?.map((user) => {
                                return (
                                  <option value={user.username}>
                                    {user.username}
                                  </option>
                                );
                              }))}
                    </select>
                  </div>
                  <div className="members">
                    {members?.map((member, index) => {
                      let random_id = Math.floor(Math.random() * 100);
                      return (
                        <img
                          src={`https://randomuser.me/api/portraits/men/${random_id}.jpg`}
                          alt={member}
                          onClick={() => {
                            if (index == 0) return;
                            const updatedMembers = members.filter(
                              (memberFilter, indexFilter) =>
                                indexFilter != index
                            );
                            setMembers(updatedMembers);
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <br />
                <div className="subtasks-container">
                  <h3>Subtasks</h3>
                  <div className="subtasks-list">
                    <li className="subtask-item">
                      <FiCircle className="icon" />
                      <input
                        type="text"
                        ref={subtaskInput}
                        onBlur={() => {
                          const newSubtask = {
                            title: subtaskInput.current.value.trimStart(),
                            completed: false,
                          };
                          if (newSubtask.title.length > 0) {
                            const updatedSubtasks = [...subtasks, newSubtask];
                            setSubtasks(updatedSubtasks);
                          }
                          subtaskInput.current.value = "";
                        }}
                      />
                    </li>
                    {subtasks?.map((subtask, index) => {
                      return (
                        <div className="subtask-item">
                          {!subtask.completed ? (
                            <FiCircle
                              className="icon"
                              onClick={() =>
                                onTaskStatusChange(!subtask.completed, index)
                              }
                            />
                          ) : (
                            <FaCheckCircle
                              className="icon"
                              onClick={() =>
                                onTaskStatusChange(!subtask.completed, index)
                              }
                              // style={{ color: "#2ecc71" }}
                            />
                          )}
                          <input
                            type="text"
                            value={subtask.title}
                            onChange={(e) => {
                              const updatedSubtasks = [...subtasks];
                              updatedSubtasks[index].title = e.target.value;
                              setSubtasks(updatedSubtasks);
                            }}
                          />
                          <span
                            className="subtask-del"
                            onClick={() => {
                              const updatedSubtasks = subtasks.filter(
                                (filterSubtask, filterIndex) =>
                                  filterIndex != index
                              );
                              setSubtasks(updatedSubtasks);
                            }}
                          >
                            &#10006;
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="task-modal-attachments">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {fileList?.map((item, index) => {
                      return (
                        <div className="attachment-item" key={index}>
                          <img
                            src={
                              ImageConfig[item.type.split("/")[1]] ||
                              ImageConfig["default"]
                            }
                            alt=""
                          />
                          <div className="attachment-item-info">
                            <p>{item.name}</p>
                            <p>{item.size}B</p>
                          </div>
                          <span
                            className="attachment-item-del"
                            onClick={() => fileRemove(item)}
                          >
                            &#10006;
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    ref={wrapperRef}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="drop-file-input"
                  >
                    <div className="drop-file-input_label">
                      <p>Click to add / drop your files here</p>
                    </div>
                    <input type="file" value="" onChange={onFileDrop} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="modal-button"
                    onClick={() => {
                      modalHandlier(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="modal-button"
                    onClick={() => {
                      onTaskCreate();
                      modalHandlier(false);
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
