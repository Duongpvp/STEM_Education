import { Box } from "@chakra-ui/react";
import MainChat from "components/MainChat/MainChat";
import React, { useEffect, useState } from "react";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  };

  const {height, width} = useWindowDimensions()
  return (
    <Box
      bg="#fff"
      width={width < 768 ? "100%" : "74.5%"}
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
