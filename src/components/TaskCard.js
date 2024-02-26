import React from "react";
import "./TaskCard.scss";
import {
  FaEllipsisH,
  FaFlag,
  FaComment,
  FaPaperclip,
  FaProjectDiagram,
  FaTasks,
} from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({
  _id,
  title,
  project,
  // description,
  // status,
  // members,
  date,
  modalHandlier,
  index,
  subtasksCount,
  attachments_count,
  task_user_role,
}) => {
  return (
    <Draggable draggableId={`${_id}`} key={_id} index={index}>
      {(provided, snapshot) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // onDrag={snapshot.isDragging}
        >
          <div>
            <div className="task-card-header">
              <span>{project}</span>
              <FaEllipsisH
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  modalHandlier({ _id, task_user_role });
                }}
              />
            </div>
            <div className="taks-card-name">
              <p>{title}</p>
            </div>
          </div>
          <div className="task-card-footer">
            <span>
              <FaFlag className="icon" />
              {date.split("T")[0]}
            </span>
            {/* <span>
              <FaComment className="icon" />3
            </span> */}

            <span>
              <FaTasks className="icon" />
              {subtasksCount}
            </span>
            <span>
              <FaPaperclip className="icon" />
              {attachments_count}
            </span>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
