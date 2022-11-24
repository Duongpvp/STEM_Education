// @ts-nocheck
import React, { useEffect, useState } from "react";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import "./UserOverview.css";
import { removeUserFromClass } from "api/ClassRequest";
import { toast } from "react-toastify";

const UserOverview = ({ currentData, fetchAgain, setFetchAgain }) => {
  const [receiveAdmin, setReceiveAdmin] = useState(currentData.adminFull);
  const [receiveUser, setReceiveUser] = useState(currentData.users);

  const handleRemove = async (user, admin) => {
    if (receiveAdmin.length === 1) {
      toast.warn("Class must have at least 1 teacher!");
      return;
    }

    if (receiveUser.length === 1) {
      toast.warn("Class must have at least 1 student!");
      return;
    }


    const { data } = await removeUserFromClass(
      currentData.cid,
      user?._id,
      admin?._id
    );
    if (!data) {
      toast.error("Failed to delete user !");
    } else {
      const newListUser = receiveUser.filter((u) => u._id !== user._id);
      setReceiveUser(newListUser);
      const newListAdmin = receiveAdmin.filter((u) => u._id !== admin._id);
      setReceiveAdmin(newListAdmin);
      toast.success("Deleted user successfully !");
      setFetchAgain(!fetchAgain);
    }
  };

  return (
    <div className="user-overview">
      <div className="teacher-overview">
        <span className="user-overview-title">Teacher</span>
        <hr />
        {receiveAdmin &&
          receiveAdmin.map((user) => (
            <button
              key={user._id}
              onClick={() => handleRemove("", user)}
              className="user-overview-content"
            >
              {user.username} <DoDisturbIcon />
            </button>
          ))}
      </div>
      <div className="student-overview">
        <span className="user-overview-title">Student</span>
        <hr />
        <div className="overflow-overview">
          {receiveUser &&
            receiveUser.map((user) => (
              <button
                onClick={() => handleRemove(user, "")}
                className="user-overview-content"
                key={user._id}
              >
                {user.username} <DoDisturbIcon />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
