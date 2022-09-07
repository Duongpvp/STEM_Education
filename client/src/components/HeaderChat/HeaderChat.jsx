// @ts-nocheck
import { Box } from "@mui/material";
import React from "react";
import "./HeaderChat.css";
import DirectChat from "components/DirectChat/DirectChat";
import SearchChat from "components/SearchChat/SearchChat";

const HeaderChat = () => {
  return (
    <>
      <Box
        display="flex"
        bgcolor="#fff"
        justifyContent="space-between"
        alignContent="center"
        width="100%"
        padding="1rem 2rem"
      >
        <SearchChat />
        <DirectChat />
      </Box>
    </>
  );
};

export default HeaderChat;
