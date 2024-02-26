import React from "react";
import "./ProjectModal.scss";
import Carousel from "../components/Carousel";
const ProjectModal = ({ isOpen, modalHandlier }) => {
  const {
    id,
    title,
    description,
    status,
    type,
    owner,
    members,
    date,
    bannerImgs,
  } = isOpen;
  console.log(isOpen);

  return (
    <>
      {isOpen && (
        <div className="project-modal">
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
                <h1>{title}</h1>
              </div>

              <div className="modal-body">
                <div
                  style={{
                    marginBottom: "20px",
                    border: "2px solid #e0e0e0",
                  }}
                >
                  <Carousel imgUrls={bannerImgs} />
                </div>
                <div className="modal-body-header">
                  <div className="tags">
                    <span>
                      <strong>{status}</strong>
                    </span>
                    <span>
                      <strong>{type}</strong>
                    </span>
                  </div>
                  <span className="project-modal-date">{date}</span>
                </div>
                <p>{description}</p>
                <p>
                  <strong>Owner:</strong> {owner.username}
                </p>
                <div className="members">
                  {members.map((member, index) => {
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
                <button
                  className="modal-button close-modal"
                  onClick={() => {
                    modalHandlier(false);
                  }}
                >
                  Close!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
