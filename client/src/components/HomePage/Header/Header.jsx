// @ts-nocheck
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer } from "@mui/material";
import { logOut } from "actions/AuthAction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../assets/img/Logo_Education.png";
import "./Header.css";

const Header = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenDrawer(open);
  };

  const logout = () => {
    dispatch(logOut());
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="header">
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon id="menu-header" />
        </Button>
        <Drawer
          anchor={"left"}
          open={isOpenDrawer}
          onClose={toggleDrawer(false)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Link className="link" to="/" style={{ margin: "0 auto" }}>
              <img
                src={Logo}
                alt="LogoSign"
                style={{ width: "10rem", height: "100%" }}
              />
            </Link>

            <Link className="link" to="/home/about">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                ABOUT US
              </Button>
            </Link>

            <Link className="link" to="/home/deanboard">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                DEAN BOARD
              </Button>
            </Link>

            <Link className="link" to="/home/department">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                DEPARTMENT
              </Button>
            </Link>

            <Link className="link" to="/home/studyprograms">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                STUDY PROGRAMS
              </Button>
            </Link>

            {user.isAdmin || user.isTeacher ? (
              <Link className="link" to="/classmanagement">
                <Button style={{ textAlign: "left", minWidth: "220px" }}>
                  Class
                </Button>
              </Link>
            ) : (
              <Link className="link" to="/class">
                <Button style={{ textAlign: "left", minWidth: "220px" }}>
                  Class
                </Button>
              </Link>
            )}

            <Link className="link" to="/chat">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                Chat
              </Button>
            </Link>

            <Link className="link" to="/media">
              <Button style={{ textAlign: "left", minWidth: "220px" }}>
                Media
              </Button>
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                bottom: "12px",
                width: "85%"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span>Name: {user.lastname}</span>
                <span>
                  Role:{" "}
                  {user.isAdmin
                    ? "Admin"
                    : user.isTeacher
                    ? "Teacher"
                    : "Student"}
                </span>
              </div>
              <Button variant="contained" style={{ background: "red" }} onClick={logout}>
                LOG OUT
              </Button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
      <Link className="link" to="/">
        <img src={Logo} alt="LogoSign" className="logo" />
      </Link>

      <ul className="header-menu">
        <li>
          <Link className="link" to="/home/about">
            About us
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/deanboard">
            Dean board
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/department">
            Department
          </Link>
        </li>
        <li>
          <Link className="link" to="/home/studyprograms">
            Study Programs
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
