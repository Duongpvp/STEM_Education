import DirectChat from "components/DirectChat/DirectChat";
import React from "react";
import AdminSidebar from "../AdminSideBar/AdminSidebar";
import ClassGrid from "../ClassGrid/ClassGrid";

const AdminClass = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-body">
        <div className="direct-side">
          <DirectChat />
        </div>
        <ClassGrid/>
      </div>
    </div>
  );
};

export default AdminClass;
