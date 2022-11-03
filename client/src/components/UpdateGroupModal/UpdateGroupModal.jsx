// @ts-nocheck
import { Box, FormControl } from "@chakra-ui/react";
import { Group, Modal } from "@mantine/core";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextField } from "@mui/material";
import {
  addUserGroup,
  leaveGroup,
  removeUserGroup,
  renameGroupChat,
  selectChat,
} from "actions/ChatAction";
import { searchUser } from "api/UserRequest";
import UserListItems from "components/UserListItems/UserListItems";
import UserTagItem from "components/UserTagItem/UserTagItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const UpdateGroupModal = ({ fetchAgain, setFetchAgain }) => {
  const chats = useSelector((state) => state.ChatReducer);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState(chats.selectChat.chatName);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const handleDelete = (users) => {
    const listFindUser = chats.selectChat.users.filter(
      (select) => select._id !== users._id
    );
    const selectData = { ...chats.selectChat, users: listFindUser };

    if (chats.selectChat.groupAdmin?._id !== user._id) {
      toast.warn("Only Admin can delete User");
      return;
    }

    try {
      dispatch(selectChat(selectData));
      dispatch(removeUserGroup(chats.selectChat._id, users));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveGroup = (users) => {
    dispatch(leaveGroup(chats.selectChat._id, users));
  }

  const handleRename = () => {
    if (!groupChatName) {
      toast.warn("Please enter the name of the chat group!");
      return;
    }
    try {
      setRenameLoading(true);
      dispatch(renameGroupChat(chats.selectChat._id, groupChatName));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await searchUser(search);
      setIsLoading(false);
      setSearchResult(data);
    } catch (error) {}
  };

  const handleAddUser = async (userAdd) => {
    if (chats.selectChat.users.find((us) => us._id === userAdd._id)) {
      toast.warn("User already in group");
      return;
    }

    if (chats.selectChat.groupAdmin?._id !== user._id) {
      toast.warn("Only Admin user can add other user to group");
      return;
    }

    const addUser = [...chats.selectChat.users, userAdd];
    const dataSelect = { ...chats.selectChat, users: addUser };

    try {
      setIsLoading(true);
      dispatch(addUserGroup(chats.selectChat._id, userAdd._id));
      dispatch(selectChat(dataSelect));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        transition="rotate-right"
        transitionDuration={300}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Setting Chat"
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            marginBottom: "12px",
          }}
        >
          {chats.selectChat.chatName}
        </span>
        <FormControl
          display="flex"
          justifyContent="space-between"
          height="100%"
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Chat name"
            variant="outlined"
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <Box
            ml="12px"
            variant="outlined"
            width="20%"
            border="1px solid #BF40BF"
            borderRadius="0.5rem"
            color="#BF40BF"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              background: "#BF40BF",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
            _loading={renameLoading}
            onClick={handleRename}
          >
            Rename
          </Box>
        </FormControl>
        <FormControl>
          <TextField
            placeholder="Add Users to group"
            fullWidth
            id="filled-basic"
            label="List friends"
            variant="filled"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl>
        {isLoading
          ? "LOADING..."
          : searchResult?.map((us) => (
              <UserListItems
                key={us._id}
                user={us}
                handleFunction={() => handleAddUser(us)}
              />
            ))}
        <Box width="100%" display="flex" flexWrap="wrap">
          {chats.selectChat.users.map((us) => (
            <UserTagItem
              key={us._id}
              user={us}
              admin={chats.selectChat.groupAdmin?._id}
              handleFunction={() => handleDelete(us)}
            />
          ))}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml="auto"
          width="20%"
          border="1px solid red"
          borderRadius="0.5rem"
          color="red"
          height="45px"
          _hover={{
            background: "red",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => handleLeaveGroup(user)}
        >
          Leave Group
        </Box>
      </Modal>

      <Group position="center">
        <SettingsIcon
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "12px",
            cursor: "pointer",
          }}
          fontSize="large"
          onClick={() => setOpened(true)}
        >
          Open Modal
        </SettingsIcon>
      </Group>
    </div>
  );
};

export default UpdateGroupModal;
