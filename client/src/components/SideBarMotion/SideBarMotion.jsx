// @ts-nocheck
import React, { useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import MediationIcon from "@mui/icons-material/Mediation";
import TocIcon from "@mui/icons-material/Toc";
import { motion } from "framer-motion";
import Item from "../ClassPage/ClassContainer/Item";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SideBarMotion.css";

const SideBarMotion = () => {
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [isOpen, setIsOpen] = useState(false);

  const sideContainerVariants = {
    true: {
      width: "14rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {
      width: "14rem",
    },
    false: {
      width: "4.3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      marginBottom: "2rem",
    },
    false: {
      marginTop: "1rem",
      marginBottom: "0rem",
      with: "1rem",
    },
  };

  const avatarVariant = {
    true: {
      width: "5rem",
      height: "5rem",
    },
    false: {
      width: "2.5rem",
      height: "2.5rem",
    }
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <motion.div
        // data-Open={isOpen}
        variants={sideContainerVariants}
        initial={`${isOpen}`}
        animate={`${isOpen}`}
        className="sidebar-container"
      >
        <motion.div
          className="sidebar"
          initial={`${isOpen}`}
          animate={`${isOpen}`}
          variants={sidebarVariants}
        >
          <motion.div
            whileHover={{
              scale: 1.3,
              rotate: 180,
              backgroundColor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(6.9px)",
              border: "1px solid rgba(255, 255, 255, 0.24)",
            }}
            className="lines-icon"
            onClick={handleToggle}
          >
            <TocIcon />
          </motion.div>
          <Link to={`../profile/${user._id}`}>
            <motion.div
              className="profile"
              initial={`${isOpen}`}
              animate={`${isOpen}`}
              variants={profileVariants}
              transition={{ duration: 0.4 }}
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(5.5px)",
                WebkitBackdropFilter: "blur(5.5px)",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
                cursor: "pointer",
              }}
            >
              <motion.img
              variants={avatarVariant}
                src={
                  user.outsideId ? user.profilePicture : user.profilePicture
                    ? serverPublicFolder + user.profilePicture
                    : serverPublicFolder + "DefaultAvatar.png"
                }
                alt=""
              />
            </motion.div>
          </Link>
          <div className="groups">
            <div className="group">
              <motion.h3
                animate={{
                  opacity: isOpen ? 1 : 0,
                  height: isOpen ? "auto" : 0,
                }}
              >
                ANALYTICS
              </motion.h3>
              <Link to="../" className="icon-class-link">
                <Item icon={<HomeIcon />} name="Home" />
              </Link>
              <Link to="../chat/" className="icon-class-link">
                <Item icon={<ForumIcon />} name="Chat" />
              </Link>
              <Link to="../media/" className="icon-class-link">
                <Item icon={<MediationIcon />} name="Media" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideBarMotion;
