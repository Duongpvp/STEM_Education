// @ts-nocheck
import { FormControl } from "@chakra-ui/react";
import { Group, Modal } from "@mantine/core";
import { AddOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createGroupChat } from "actions/ChatAction";
import { searchUser } from "api/UserRequest";
import UserListItems from "components/UserListItems/UserListItems";
import UserTagItem from "components/UserTagItem/UserTagItem";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const GroupChatModal = () => {
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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

  const handleGroup = (user) => {
    let selectedUserId = [];
    for (var i = 0; i < selectedUsers.length; i++) {
      selectedUserId.push(selectedUsers[i]._id);
    }

    if (selectedUserId.includes(user._id)) {
      toast.error("User already added");
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((select) => select._id !== user._id));
  };

  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers) {
      toast.warn("Please fill all the fields");
      return;
    }

    try {
      const listUsers = JSON.stringify(selectedUsers.map((u) => u._id));
      dispatch(createGroupChat(groupChatName, listUsers));
      setOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Make some moment with your friends!"
      >
        <FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Chat name"
            variant="outlined"
            onChange={(e) => setGroupChatName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <TextField
            placeholder="Ex: YanG, Denis, Flex, Aliz"
            fullWidth
            id="filled-basic"
            label="List friends"
            variant="filled"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl>
        <Box width="100%" display="flex" flexWrap="wrap">
          {selectedUsers.map((tag) => (
            <UserTagItem
              key={tag._id}
              user={tag}
              handleFunction={() => handleDelete(tag)}
            />
          ))}
        </Box>
        {isLoading
          ? "Loading..."
          : searchResult
              ?.slice(0, 5)
              .map((user) => (
                <UserListItems
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Button
            style={{ backgroundColor: "#ee9be4", color: "#fff" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Create Chat
          </Button>
        </div>
      </Modal>

      <Group position="center">
        <Button
          style={{ backgroundColor: "#6a1b9a" }}
          variant="contained"
          onClick={() => setOpened(true)}
          endIcon={<AddOutlined />}
        >
          New Chats
        </Button>
      </Group>
    </>
  );
};

export default GroupChatModal;
