// @ts-nocheck
import { getAllUser } from "api/UserRequest";
import React, { useEffect, useState } from "react";
import AdminCard from "../AdminCard/AdminCard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./DashBoard.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashBoard = ({logOnlineUser}) => {
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

  const logData = [
    {
      name: "Jan",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Feb",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Mar",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Apr",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "May",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Jun",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Jul",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Aug",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Sep",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Oct",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Nov",
      admin: 0,
      teacher: 0,
      student: 0,
    },
    {
      name: "Dec",
      admin: 0,
      teacher: 0,
      student: 0,
    },
  ];

  for (var i = 0; i < users?.length; i++) {
    const monthNumber = users[i].createdAt.slice(5, 7);
    switch (monthNumber) {
      case "01":
        users[i].isAdmin
          ? (logData[0].admin += 1)
          : users[i].isTeacher
          ? (logData[0].teacher += 1)
          : (logData[0].student += 1);
        break;
      case "02":
        users[i].isAdmin
          ? (logData[1].admin += 1)
          : users[i].isTeacher
          ? (logData[1].teacher += 1)
          : (logData[1].student += 1);
        break;
      case "03":
        users[i].isAdmin
          ? (logData[2].admin += 1)
          : users[i].isTeacher
          ? (logData[2].teacher += 1)
          : (logData[2].student += 1);
        break;
      case "04":
        users[i].isAdmin
          ? (logData[3].admin += 1)
          : users[i].isTeacher
          ? (logData[3].teacher += 1)
          : (logData[3].student += 1);
        break;
      case "05":
        users[i].isAdmin
          ? (logData[4].admin += 1)
          : users[i].isTeacher
          ? (logData[4].teacher += 1)
          : (logData[4].student += 1);
        break;
      case "06":
        users[i].isAdmin
          ? (logData[5].admin += 1)
          : users[i].isTeacher
          ? (logData[5].teacher += 1)
          : (logData[5].student += 1);
        break;
      case "07":
        users[i].isAdmin
          ? (logData[6].admin += 1)
          : users[i].isTeacher
          ? (logData[6].teacher += 1)
          : (logData[6].student += 1);
        break;
      case "08":
        users[i].isAdmin
          ? (logData[7].admin += 1)
          : users[i].isTeacher
          ? (logData[7].teacher += 1)
          : (logData[7].student += 1);
        break;
      case "09":
        users[i].isAdmin
          ? (logData[8].admin += 1)
          : users[i].isTeacher
          ? (logData[8].teacher += 1)
          : (logData[8].student += 1);
        break;
      case "10":
        users[i].isAdmin
          ? (logData[9].admin += 1)
          : users[i].isTeacher
          ? (logData[9].teacher += 1)
          : (logData[9].student += 1);
        break;
      case "11":
        users[i].isAdmin
          ? (logData[10].admin += 1)
          : users[i].isTeacher
          ? (logData[10].teacher += 1)
          : (logData[10].student += 1);
        break;
      case "12":
        users[i].isAdmin
          ? (logData[11].admin += 1)
          : users[i].isTeacher
          ? (logData[11].teacher += 1)
          : (logData[11].student += 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="dashboard">
      <div className="list-all-user-card">
        <AdminCard users={users} icon={<AccountCircleIcon />} title="USERS" />
        <AdminCard
          users={users?.filter((user) => user.isAdmin && user)}
          icon={<AdminPanelSettingsIcon />}
          title="ADMINS"
        />
        <AdminCard
          users={users?.filter((user) => user.isTeacher && user)}
          icon={<AssignmentIndIcon />}
          title="TEACHERS"
        />
        <AdminCard
          users={users?.filter(
            (user) => !user.isAdmin && !user.isTeacher && user
          )}
          icon={<SchoolIcon />}
          title="STUDENTS"
        />
      </div>
      <div className="admin-chart">
        <AreaChart
          width={1200}
          height={350}
          data={logData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTeacher" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStudent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fa8ca9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fa8ca9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="admin"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorAdmin)"
          />
          <Area
            type="monotone"
            dataKey="teacher"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorTeacher)"
          />
          <Area
            type="monotone"
            dataKey="student"
            stroke="#fa8ca9"
            fillOpacity={1}
            fill="url(#colorStudent)"
          />
          <Legend />
        </AreaChart>
        <LineChart
          width={1200}
          height={380}
          data={logOnlineUser}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax + 4']}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="user" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default DashBoard;
