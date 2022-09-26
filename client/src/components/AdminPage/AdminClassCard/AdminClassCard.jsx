import React from "react";
import "./AdminClassCard.css"

const AdminClassCard = ({ classData }) => {
  return (
    <div className="admin-class-card">
      <span>{classData?.className}</span>
      <p>{classData?.snippet}</p>
    </div>
  );
};

export default AdminClassCard;
