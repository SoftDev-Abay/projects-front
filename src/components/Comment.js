import React from "react";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiListUnordered,
  RiAtLine,
  RiMoreLine,
  RiEmotionLine,
} from "react-icons/ri";
const Comment = ({ id, replyId, username, text, time, level, setReplyId }) => {
  return (
    <div class={`comment`} style={{ marginLeft: `${level * 32}px` }}>
      <div class="user-banner">
        <div class="user">
          <div class="avatar">
            <img
              src={`https://randomuser.me/api/portraits/${
                Math.round(Math.random()) ? "women" : "men"
              }/${id}.jpg`}
            />
            <span class="stat grey"></span>
          </div>
          <h5>{username}</h5>
        </div>
        <button class="btn dropdown">
          <RiMoreLine />
        </button>
      </div>
      <div class="content">
        <p>{text}</p>
      </div>
      <div class="footer">
        <button class="btn">
          <RiEmotionLine />
        </button>
        <div class="reactions">
          <button class="btn react">
            <img alt="" />1
          </button>
        </div>
        <div class="divider"></div>
        <a onClick={() => setReplyId(id)} href="#">
          Reply
        </a>
        <div class="divider"></div>
        <span class="is-mute">{time}</span>
      </div>
    </div>
  );
};

export default Comment;
