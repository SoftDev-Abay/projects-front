import React, { useRef, useState } from "react";
import "./Profile.scss";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation("global");
  const [avatar, setAvatar] = useState(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("image", avatar);
    formData.append("username", userNameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("currentPassword", currentPasswordRef.current.value);
    formData.append("newPassword", newPasswordRef.current.value);
    const res = await axios.put(
      `https://projects-backend-mldr.onrender.com/users/${user._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setAvatar(null);
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        <h1>{t("profile.header")}</h1>
        <div className="body-wrapper">
          <form onSubmit={handleSubmit}>
            <label>{t("profile.form.userName")} </label>
            <input type="text" defaultValue={user.username} ref={userNameRef} />
            <label>{t("profile.form.email")} </label>
            <input type="email" defaultValue={user.email} ref={emailRef} />
            <label>{t("profile.form.currentPassword")} </label>
            <input type="password" ref={currentPasswordRef} />
            <label>{t("profile.form.newPassword")} </label>
            <input type="password" ref={newPasswordRef} />
            <div className="buttons-footer">
              <button className="" type="button">
                {t("profile.form.cancel")}
              </button>
              <button className="save-button" type="submit">
                {t("profile.form.submit")}
              </button>
            </div>
          </form>
          <div className="picture-settings">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `https://projects-backend-mldr.onrender.com/images/${user.avatar_name}`
              }
              alt=""
            />
            <div className="edit-image-wrapper">
              <p>{t("profile.form.editPicture")}</p>
              <input
                type="file"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
