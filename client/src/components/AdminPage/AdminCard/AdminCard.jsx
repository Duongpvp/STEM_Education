import React from "react";

import "./AdminCard.css";

const AdminCard = ({ users, icon, title }) => {
  console.log("users: ", users);
  return (
    <div className="admin-user-card">
      {icon}
      <div className="admin-user-card-info">
        <label>{title}</label>
        <span>Total: {users?.length}</span>
      </div>
    </div>
  );
};

export default AdminCard;
