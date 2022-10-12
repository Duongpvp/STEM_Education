import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/Logo_Education.png";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <section className="admin-sidebar">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>
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
