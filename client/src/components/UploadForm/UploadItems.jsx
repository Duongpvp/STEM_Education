import React from "react";
import "./UploadItems.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const UploadItems = ({ files, setFiles }) => {
  const arrFiles = Array.from(files);

  return (
    <div className="upload-items">
      {arrFiles.map((file) => (
        <div className="items" key={file.name}>
          <span>{file.name}</span>
          <RemoveCircleOutlineIcon />
        </div>
      ))}
    </div>
  );
};

export default UploadItems;
