import React, { useRef } from "react";
import "./AttachmentsAddSpace.scss";

const AttachmentsAddSpace = ({ fileList, setFileList }) => {
  const wrapperRef = useRef(null);

  const onDragOver = () => {
    wrapperRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };
  const onDrop = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile, newFile.type, newFile.type.split("/")[1]);
    if (newFile) {
      const updatedFileList = [...fileList, newFile];
      setFileList(updatedFileList);
    }
  };

  return (
    <div
      ref={wrapperRef}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="drop-file-input"
    >
      <div className="drop-file-input_label">
        <p>Click to add / drop your files here</p>
      </div>
      <input type="file" value="" onChange={onFileDrop} />
    </div>
  );
};

export default AttachmentsAddSpace;
