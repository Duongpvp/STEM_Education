// @ts-nocheck
import { userOnline } from "actions/UserAction";
import AdminSidebar from "components/AdminPage/AdminSideBar/AdminSidebar";
import DashBoard from "components/AdminPage/DashBoard/DashBoard";
import DirectChat from "components/DirectChat/DirectChat";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./Admin.css";

const Admin = () => {
  const socket = useRef();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.AuthReducer.authData);
  const onlineUser = useSelector((state) => state.UserReducer.onlineUser);

  const [logOnlineUser, setLogOnlineUser] = useState([])

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      for (var i = 0; i < onlineUser.length; i++) {
        if (onlineUser[i].userId === users) {
          return;
        } else {
          dispatch(userOnline(users));
        }
      }
    });
    socket.current.on("get-log-online", (logUser) => {
      setLogOnlineUser(logUser)
    })
  }, [user]);

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-body">
        <div className="direct-side">
          <DirectChat />
        </div>
        <DashBoard logOnlineUser={logOnlineUser} />
      </div>
    </div>
  );
};

export default Admin;
