import React from "react";

const UserOverview = ({ currentData }) => {
    console.log(currentData)
  return (
    <div className="user-overview">
      <div className="teacher-overview">
        <span className="user-overview-title">Teacher</span>
        <hr />
        {/* {currentData.map((data) => (
          <>
            {}
          </>
        ))} */}
      </div>
      <div className="student-overview">Student</div>
    </div>
  );
};

export default UserOverview;
