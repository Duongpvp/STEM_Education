import React from "react";
import Logo from "../../../assets/img/Logo_Education.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import SchoolIcon from "@mui/icons-material/School";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <section className="admin-sidebar">
      <img src={Logo} alt="" />
      <Link to="/admin/">
        <div className="feature-group">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link to="/admin/users/">
        <div className="feature-group">
          <SupervisedUserCircleIcon />
          <span>Users</span>
        </div>
      </Link>
      <Link to="/admin/class/">
        <div className="feature-group">
          <SchoolIcon />
          <span>Class</span>
        </div>
      </Link>
    </section>
  );
};

export default AdminSidebar;
