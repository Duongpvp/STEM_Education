import React from "react";
import "./Item.css";
import { motion } from "framer-motion";

const Item = ({ icon, name }) => {
  const subheading = {
    true: {
      opacity: 1,
    },
    false: {
      opacity: 0,
      display: "block",
    },
  };
  return (
    <motion.div
      whileHover={{
        width:"100%",
        backgroundColor: "rgba(255,255,255,0.3)",
        boxShadow: "0 8px 16px 0 rgba(31, 38, 135, 0.34)",
        backdropFilter: "blur(6.9px)",
        WebkitBackdropFilter: "blur(6.9px)",
        border: "1px solid rgba(255, 255, 255, 0.24)",
        cursor: "pointer",
      }}
      transition={{
        type: "none",
        duration: 0.1,
      }}
      className="item"
    >
      <div className="icon">{icon}</div>
      <motion.span variants={subheading}>{name}</motion.span>
    </motion.div>
  );
};

export default Item;
