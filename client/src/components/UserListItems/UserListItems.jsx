// @ts-nocheck
import { Box, Text } from "@chakra-ui/react";
import { Avatar } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

const UserListItems = ({ user, handleFunction }) => {
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const userMain = useSelector((state) => state.AuthReducer.authData);

  return (
    <>
      {userMain.user._id !== user._id && (
        <Box
          display="flex"
          onClick={handleFunction}
          cursor="pointer"
          bg="#E8E8E8"
          _hover={{
            background: "#a76afc",
            color: "#fff",
          }}
          width="100%"
          margin="0 auto"
          alignItems="center"
          color="#000"
          px={10}
          py={6}
          mb={2}
          borderRadius="0.5rem"
        >
          <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            src={
              user.profilePicture
                ? serverPublicFolder + user.profilePicture
                : serverPublicFolder + "DefaultAvatar.png"
            }
          />
          <Box pl={8}>
            <Text fontSize="1rem">{user.firstname}</Text>
            <Text fontSize="0.8rem">
              <b>Email : </b>
              {user.username}
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserListItems;
