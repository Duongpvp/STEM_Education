import React from "react";
import Logo from "../../../assets/img/Logo_Education.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import SchoolIcon from '@mui/icons-material/School';
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <section className="admin-sidebar">
      <img src={Logo} alt="" />
      <div className="feature-group">
        <DashboardIcon/>
        <span>Dashboard</span>
      </div>
      <div className="feature-group">
        <SupervisedUserCircleIcon/>
        <span>Users</span>
      </div>
      <div className="feature-group">
        <SchoolIcon/>
        <span>Class</span>
      </div>
      <div className="feature-group">
        <ChatIcon/>
        <span>Chat</span>
      </div>
      <div className="feature-group">
        <ShareIcon/>
        <span>Post</span>
      </div>
    </section>
  );
};

export default AdminSidebar;
