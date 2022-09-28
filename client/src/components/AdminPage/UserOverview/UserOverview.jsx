import React from "react";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import "./UserOverview.css";
import { removeUserFromClass } from "api/ClassRequest";
import { toast } from "react-toastify";

const UserOverview = ({ currentData, fetchAgain, setFetchAgain }) => {
  const handleRemove = async (user) => {
    const { data } = await removeUserFromClass(currentData.cid, user._id);
    if (!data) {
      toast.error("Failed to delete user !");
    } else {
      toast.success("Deleted user successfully !");
      setFetchAgain(!fetchAgain);
    }
  };

  return (
    <div className="user-overview">
      <div className="teacher-overview">
        <span className="user-overview-title">Teacher</span>
        <hr />
        {currentData.adminFull.map((user) => (
          <button
            key={user._id}
            onClick={() => handleRemove(user)}
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
          {currentData.users &&
            currentData.users.map((user) => (
              <button
                onClick={() => handleRemove(user)}
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
