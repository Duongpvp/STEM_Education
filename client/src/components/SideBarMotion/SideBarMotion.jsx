// @ts-nocheck
import React, { useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import MediationIcon from "@mui/icons-material/Mediation";
import TocIcon from "@mui/icons-material/Toc";
import { motion } from "framer-motion";
import Item from "../ClassPage/ClassContainer/Item";
import { useSelector } from "react-redux";

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
      alignSelf: "center",
      width: "5rem",
      marginBottom: "2rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "1rem",
      marginBottom: "0rem",
      width: "2.5rem",
    },
  };

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
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            className="lines-icon"
            onClick={handleToggle}
          >
            <TocIcon />
          </motion.div>
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
            <img
              src={
                user.profilePicture
                  ? serverPublicFolder + user.profilePicture
                  : serverPublicFolder + "DefaultAvatar.png"
              }
              alt=""
            />
          </motion.div>
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
              <Item icon={<HomeIcon />} name="Home" />
              <Item icon={<ForumIcon />} name="Chat" />
              <Item icon={<MediationIcon />} name="Media" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideBarMotion;
