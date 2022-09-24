import AdminSidebar from "components/AdminPage/AdminSideBar/AdminSidebar";
import DashBoard from "components/AdminPage/DashBoard/DashBoard";
import DirectChat from "components/DirectChat/DirectChat";
import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-body">
        <div className="direct-side">
          <DirectChat />
        </div>
        <DashBoard />
      </div>
    </div>
  );
};

export default Admin;
