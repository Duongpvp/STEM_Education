// @ts-nocheck
import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../assets/img/Logo_Education.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenDrawer(open);
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
              Class
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
