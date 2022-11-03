import { Button } from "@mui/material";
import React from "react";
import "./UploadItems.css";

const UploadItems = ({ files, setFiles }) => {
  const arrFiles = Array.from(files);

  return (
    <div className="upload-items">
      {arrFiles.map((file) => (
        <div className="items" key={file.name}>
          <Button>
            {file.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UploadItems;
