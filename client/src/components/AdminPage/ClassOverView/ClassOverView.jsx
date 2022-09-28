import { Button, TextField } from "@mui/material";
import { updateClass } from "api/ClassRequest";
import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import "./ClassOverView.css";

const ClassOverView = ({ currentData }) => {
  const [nameClass, setNameClass] = useState(currentData?.nameClass);
  const [desc, setDesc] = useState(currentData?.snippet);

  const NameClasshandler = (e) => {
    setNameClass(e.target.value);
  };

  const DescHandler = (e) => {
    setDesc(e.target.value);
  };

  const handleUpdateClass = async() => {
    try {
        await updateClass(currentData.cid, nameClass, desc)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="class-overview">
      <TextField
        id="outlined-basic"
        label="Class Name"
        variant="outlined"
        onChange={NameClasshandler}
        defaultValue={currentData?.className}
        fullWidth
      />
      <div className="input-box">
        <ReactTextareaAutosize
          minRows={2}
          name="message"
          required
          onChange={DescHandler}
          defaultValue={currentData?.snippet}
        />
        <label>Description</label>
      </div>
      <Button
        variant="contained"
        onClick={handleUpdateClass}
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "120px",
          margin: "0 0 0 auto"
        }}
      >
        UPDATE
      </Button>
    </div>
  );
};

export default ClassOverView;
