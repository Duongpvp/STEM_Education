import AdminSidebar from "components/AdminPage/AdminSideBar/AdminSidebar";
import DashBoard from "components/AdminPage/DashBoard/DashBoard";
import React from "react";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <AdminSidebar/>
      <DashBoard/>
    </div>
  );
};

export default Admin;
