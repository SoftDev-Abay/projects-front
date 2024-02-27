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
import { FiCircle } from "react-icons/fi";
import { ImageConfig } from "../config/ImageConfig";
import { useEffect } from "react";
import Subtasks from "../components/Subtasks";
import { axiosPrivate } from "../api/axios";

const TaskModal = ({ isOpen, modalHandlier }) => {
  const [task, setTask] = useState(null);
  const [changedSubtasks, setChangedSubtasks] = useState([]);

  // console.log(isOpen);

  const getTaskInfo = useCallback(async () => {
    try {
      const res = await axiosPrivate(`/task/${isOpen}`);
      const data = await res.data;
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
      const res = await axiosPrivate.put(`task/subtasks/${isOpen}`, {
        subtasks: changedSubtasks,
      });
      alert("Task updated successfully!");
      modalHandlier(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const downloadFile = async (file_name) => {
    try {
      const response = await axiosPrivate(`/attachments/${file_name}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Retrieve the filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/["']/g, "")
        : file_name;

      // Blob() method to handle the binary data
      const blob = await response.blob();

      // Create a temporary link element and trigger the download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename); // Set the filename for the download
      document.body.appendChild(link);
      link.click();

      // Clean-up by revoking the object URL and removing the temporary link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
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
                              <p
                                onClick={() => downloadFile(item.file_name)}
                                style={{ cursor: "pointer" }}
                              >
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
