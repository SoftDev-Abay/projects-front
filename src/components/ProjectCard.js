import { React, useState } from "react";
import "./ProjectCard.scss";

const ProjectCard = ({
  id,
  title,
  description,
  status,
  type,
  owner,
  members,
  date,
  bannerImgs,
  modalHandlier,
}) => {
  const [descriptionFull, setDescriptionFull] = useState(false);

  return (
    <div
      className="project-card "
      onClick={() => {
        modalHandlier({
          id,
          title,
          description,
          status,
          type,
          owner,
          members,
          date,
          bannerImgs,
        });
      }}
    >
      <div>
        <h4 className="title">{title}</h4>
        <span className="date">{date}</span>
        <p
          className={`description ${descriptionFull ? "description-full" : ""}`}
        >
          {description}
        </p>
        {description.length > 255 && !descriptionFull && (
          <span
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              setDescriptionFull(true);
            }}
          >
            Read more
          </span>
        )}
        {description.length > 255 && descriptionFull && (
          <span
            className="read-more"
            onClick={(e) => {
              e.stopPropagation();
              setDescriptionFull(false);
            }}
          >
            Read less
          </span>
        )}
      </div>
      <div className="members">
        {members.map((member, index) => {
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
    </div>
  );
};

export default ProjectCard;
