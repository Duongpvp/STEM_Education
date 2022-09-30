import { Box } from "@chakra-ui/react";
import MainChat from "components/MainChat/MainChat";
import SingleChat from "components/SingleChat/SingleChat";
import React from "react";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <Box
      bg="#fff"
      width="74.5%"
      height="100%"
      my="12px"
      display="flex"
      flexDir="column"
      borderRadius="0.75rem"
      borderWidth="1px"
    >
      {/* <SingleChat 
        fetchAgain={fetchAgain} 
        setFetchAgain={setFetchAgain} 
      /> */}
      <MainChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
