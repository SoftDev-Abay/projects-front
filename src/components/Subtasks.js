import { React, useRef } from "react";

import { FiCircle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

import "./Subtasks.scss";

const Subtasks = ({ subtasks, setSubtasks }) => {
  const subtaskInput = useRef(null);
  const onTaskStatusChange = (status, index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = status;
    setSubtasks(updatedSubtasks);
  };

  return (
    <div className="subtasks-list">
      <li className="subtask-item">
        <FiCircle className="icon" />
        <input
          type="text"
          ref={subtaskInput}
          onBlur={() => {
            const newSubtask = {
              text: subtaskInput.current.value.trimStart(),
              completed: false,
            };
            if (newSubtask.text.length > 0) {
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
                onClick={() => onTaskStatusChange(!subtask.completed, index)}
              />
            ) : (
              <FaCheckCircle
                className="icon"
                onClick={() => onTaskStatusChange(!subtask.completed, index)}
                // style={{ color: "#2ecc71" }}
              />
            )}
            <input
              type="text"
              value={subtask.text}
              onChange={(e) => {
                const updatedSubtasks = [...subtasks];
                updatedSubtasks[index].text = e.target.value;
                setSubtasks(updatedSubtasks);
              }}
            />
            <span
              className="subtask-del"
              onClick={() => {
                const updatedSubtasks = subtasks.filter(
                  (filterSubtask, filterIndex) => filterIndex != index
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
  );
};

export default Subtasks;
