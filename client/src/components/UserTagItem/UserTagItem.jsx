// @ts-nocheck
import { Box } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import React from "react";

const UserTagItem = ({ user, handleFunction, admin }) => {
  return (
    <>
      {admin === user._id ? (
        <Tooltip title="ADMIN" placement="bottom">
          <Box
            display="flex"
            alignItems="center"
            px={2}
            py={1}
            borderRadius="0.75rem"
            mr={6}
            my={8}
            fontSize={12}
            color="#fff"
            bgColor="orange"
            cursor="pointer"
          >
            {user.lastname}
          </Box>
        </Tooltip>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          px={2}
          py={1}
          borderRadius="0.75rem"
          mr={6}
          my={8}
          fontSize={12}
          color="#fff"
          bgColor="purple"
          cursor="pointer"
          onClick={handleFunction}
        >
          {user.lastname} <CloseIcon />
        </Box>
      )}
    </>
  );
};

export default UserTagItem;
