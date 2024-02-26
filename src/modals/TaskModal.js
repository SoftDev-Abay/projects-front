import { React, useCallback, useRef, useState } from "react";
import "./TaskModal.scss";
import {
  FaGgCircle,
  FaCircle,
  FaCircleNotch,
  FaEllipsisH,
  FaFlag,
  FaComment,
  FaPaperclip,
  FaCheckCircle,
} from "react-icons/fa";
import Comments from "../components/Comments";
import axios from "axios";
import { FiCircle } from "react-icons/fi";
import { ImageConfig } from "../config/ImageConfig";
import { useEffect } from "react";
import Subtasks from "../components/Subtasks";

const TaskModal = ({ isOpen, modalHandlier }) => {
  const [task, setTask] = useState(null);
  const [changedSubtasks, setChangedSubtasks] = useState([]);

  // console.log(isOpen);

  const getTaskInfo = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5555/task/${isOpen}`);
      const data = await res.json();
      setTask(data);
      setChangedSubtasks(data.subtasks);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    console.log(task);
    getTaskInfo();
  }, [isOpen]);

  if (!task) {
    return null;
  }

  const editTaskHandlier = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5555/task/subtasks/${isOpen}`,
        {
          subtasks: changedSubtasks,
        }
      );
      alert("Task updated successfully!");
      modalHandlier(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const {
    id,
    name,
    project_name,
    description,
    status,
    members,
    date_created,
    attachments,
  } = task;

  return (
    <>
      {isOpen && (
        <div className="task-modal">
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
                <h1>{name}</h1>
              </div>
              <div className="modal-body">
                <div className="modal-body-header">
                  <div className="tags">
                    <span>
                      <strong>{status}</strong>
                    </span>
                    <span>
                      <strong>{project_name}</strong>
                    </span>
                  </div>
                  <span className="project-modal-date">
                    {date_created.split("T")[0]}
                  </span>
                </div>
                <p>{description}</p>
                <div className="members">
                  {members?.map((member, index) => {
                    let random_id = Math.floor(Math.random() * 100);
                    return (
                      <img
                        src={
                          member.avatar_name != null
                            ? `http://localhost:5555/images/${member.avatar_name}`
                            : "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                        }
                        alt={member}
                      />
                    );
                  })}
                </div>

                <br />
                <div className="subtasks-container">
                  <h3>Subtasks</h3>
                  <Subtasks
                    subtasks={changedSubtasks}
                    setSubtasks={setChangedSubtasks}
                  />
                </div>

                {attachments?.length > 0 && (
                  <div className="task-modal-attachments">
                    <h3>Attachments</h3>
                    <div className="attachments-list">
                      {attachments?.map((item, index) => {
                        return (
                          <div className="attachment-item" key={index}>
                            <img
                              src={
                                ImageConfig[item.file_name.split(".")[1]] ||
                                ImageConfig["default"]
                              }
                              alt=""
                            />
                            <div className="attachment-item-info">
                              <p>
                                {item.file_name.split(
                                  0,
                                  -(item.file_name.split(".")[1].length + 33)
                                )}
                              </p>
                              <p>20B</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* <Comments /> */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <button
                      className="modal-button close-modal"
                      onClick={() => {
                        modalHandlier(false);
                      }}
                    >
                      Close!
                    </button>
                  </div>
                  {task.subtasks != changedSubtasks && (
                    <button
                      className="modal-button close-modal"
                      style={{ marginLeft: "20px" }}
                      onClick={() => {
                        editTaskHandlier();
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
