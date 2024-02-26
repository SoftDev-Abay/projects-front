import React from "react";
import { ImageConfig } from "../config/ImageConfig";
import "./AttachmentsItem.scss";
const AttachmentsItem = ({ item, index, fileRemove }) => {
  return (
    <div className="attachment-item" key={index}>
      <img
        src={ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]}
        alt=""
      />
      <div className="attachment-item-info">
        <p>{item.name}</p>
        <p>{item.size}B</p>
      </div>
      <span className="attachment-item-del" onClick={() => fileRemove(item)}>
        &#10006;
      </span>
    </div>
  );
};

export default AttachmentsItem;
