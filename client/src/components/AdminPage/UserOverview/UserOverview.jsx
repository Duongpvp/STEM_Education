import React from "react";
import "./UserOverview.css"

const UserOverview = ({ currentData }) => {
  return (
    <div className="user-overview">
      <div className="teacher-overview">
        <span className="user-overview-title">Teacher</span>
        <hr />
        {currentData.classAdmin}
      </div>
      <div className="student-overview">
        <span className="user-overview-title">Student</span>
        <hr />
        {currentData.users && currentData.users.map((user) => (
          <div key={user.id}>
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOverview;
