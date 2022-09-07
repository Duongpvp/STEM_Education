// @ts-nocheck
import { Box } from "@mui/material";
import ChatBox from "components/ChatBox/ChatBox";
import ChatSide from "components/ChatSide/ChatSide";
import HeaderChat from "components/HeaderChat/HeaderChat";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="Chat" style={{ width: "100%"}}>
      {user && <HeaderChat />}
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        width="100%"
        height="85vh"
      >
        {user && <ChatSide fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;
