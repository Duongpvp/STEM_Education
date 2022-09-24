// @ts-nocheck
import { getAllUser } from "api/UserRequest";
import React, { useEffect, useState } from "react";
import AdminCard from "../AdminCard/AdminCard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./DashBoard.css";

const DashBoard = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const { data } = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUser();
  }, []);

  return (
    <div className="dashboard">
      <div className="list-all-user-card">
        <AdminCard users={users} icon={<AccountCircleIcon/>} title="USERS"/>
        <AdminCard
          users={users?.filter((user) => user.isAdmin && user)}
          icon={<AdminPanelSettingsIcon/>}
          title="ADMINS"
        />
        <AdminCard
          users={users?.filter((user) => user.isTeacher && user)}
          icon={<AssignmentIndIcon/>}
          title="TEACHERS"
        />
        <AdminCard
          users={users?.filter((user) => !user.isAdmin && !user.isTeacher && user)}
          icon={<SchoolIcon/>}
          title="STUDENTS"
        />
      </div>
      <div className="admin-chart">Chart</div>
    </div>
  );
};

export default DashBoard;
