import { React, useState, useEffect } from "react";
import "./Comments.scss";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiListUnordered,
  RiAtLine,
  RiMoreLine,
  RiEmotionLine,
} from "react-icons/ri";
import Comment from "./Comment";
import { useRef } from "react";
import { globalComments } from "../assets";

const Comments = () => {
  const [rawComments, setRawComments] = useState(globalComments);
  const [commentsContent, setCommentsContent] = useState([]);
  const [replyCommentId, setReplyCommentId] = useState(0);
  const newCommentText = useRef(null);

  const SortComments = (comments) => {
    let tempComments = comments.map((comment) => {
      return { ...comment, repliedComments: [] }; // Fixed typo here
    });

    tempComments.map((comment) => {
      tempComments.forEach((globalComment) => {
        if (globalComment.replyId == comment.id) {
          comment.repliedComments = [...comment.repliedComments, globalComment]; // Fixed typo here
        }
      });
      return comment;
    });
    tempComments = tempComments.filter((comment) => comment.replyId == 0);

    return tempComments;
  };

  const recursivelyAddComments = (comment, comments) => {
    comments.push(comment);
    if (comment.repliedComments.length > 0) {
      // Fixed typo here
      comment.repliedComments.forEach((repliedComment) => {
        // Fixed typo here
        comments = [
          ...comments,
          ...recursivelyAddComments(
            { ...repliedComment, level: comment.level + 1 },
            []
          ),
        ];
      });
    }
    return comments;
  };

  const transformSortedCommentsToLinearWithLevels = (comments) => {
    let index = 0;
    let content = [];
    while (index < comments.length) {
      content = [
        ...content,
        ...recursivelyAddComments({ ...comments[index], level: 0 }, []),
      ];
      index++;
    }
    return content;
  };

  const CreateComment = () => {
    const commentText = newCommentText.current.innerText;
    setRawComments((prevRawComment) => [
      ...prevRawComment,
      {
        id: rawComments.length + 1,
        username: "Abay Aliyev",
        text: commentText,
        time: "1 min",
        replyId: replyCommentId,
      },
    ]);
  };
  const processComments = () => {
    let tempRawComments = SortComments(rawComments);
    let tempCommentsContent =
      transformSortedCommentsToLinearWithLevels(tempRawComments);

    setCommentsContent(tempCommentsContent);
  };

  useEffect(() => {
    processComments(); // Call the processing function in useEffect
  }, [rawComments]);

  return (
    <div className="comments-container">
      <div className="block">
        <div className="block-header">
          <div className="title">
            <h2>Comments</h2>
            <div className="tag">{commentsContent.length}</div>
          </div>
          <div className="group-radio">
            <span className="button-radio">
              <input id="latest" name="latest" type="radio" defaultChecked />
              <label htmlFor="latest">Latest</label>
            </span>
            <div className="divider"></div>
            <span className="button-radio">
              <input id="popular" name="latest" type="radio" />
              <label htmlFor="popular">Popular</label>
            </span>
          </div>
        </div>
        <div className="writing">
          <div
            contentEditable="true"
            className="textarea"
            autoFocus
            spellCheck="false"
            ref={newCommentText}
          >
            <p>
              Hi <a className="tagged-user">@Jo</a>
            </p>
          </div>
          <div className="footer">
            <div className="text-format">
              <button className="btn">
                <RiBold />
              </button>
              <button className="btn">
                <RiItalic />
              </button>
              <button className="btn">
                <RiUnderline />
              </button>
              <button className="btn">
                <RiListUnordered />
              </button>
            </div>
            <div className="group-button">
              <button className="btn">
                <RiAtLine />
              </button>
              <button className="btn primary" onClick={CreateComment}>
                Send
              </button>
            </div>
          </div>
        </div>

        {commentsContent.map((comment) => {
          return (
            <Comment
              key={comment.id}
              {...comment}
              setReplyId={setReplyCommentId}
            />
          );
        })}

        <div className="load">
          <span>
            <i className="ri-refresh-line"></i>Loading
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
