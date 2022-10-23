// @ts-nocheck
import { FormControl } from "@chakra-ui/react";
import { Modal } from "@mantine/core";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, Button, Drawer, TextField } from "@mui/material";
import { createGroupChat } from "actions/ChatAction";
import { searchUser } from "api/UserRequest";
import ChatSide from "components/ChatSide/ChatSide";
import DirectChat from "components/DirectChat/DirectChat";
import SearchChat from "components/SearchChat/SearchChat";
import UserListItems from "components/UserListItems/UserListItems";
import UserTagItem from "components/UserTagItem/UserTagItem";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HeaderChat.css";

const HeaderChat = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
    if (selectedUsers.includes(user)) {
      console.log("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((select) => select._id !== user._id));
  };

  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const listUsers = JSON.stringify(selectedUsers.map((u) => u._id));
      dispatch(createGroupChat(groupChatName, listUsers));
    } catch (error) {
      console.log(error);
    }
  };

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

  const { height, width } = useWindowDimensions();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenDrawer(open);
  };

  return (
    <>
      <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
        <ChatSide location={"header-chat"} />
      </Drawer>
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
      <Box
        display="flex"
        bgcolor="#fff"
        justifyContent="space-between"
        alignContent="center"
        width="100%"
        padding="1rem 2rem"
      >
        <SearchChat />
        <div style={{ display: width < 768 ? "flex" : "none" }}>
          <Button
            style={{ height: "100%" }}
            onClick={() => setIsOpenDrawer(true)}
          >
            <MenuOpenIcon />
          </Button>
          <Button style={{ height: "100%" }} onClick={() => setOpened(true)}>
            <GroupAddIcon />
          </Button>
        </div>
        <DirectChat />
      </Box>
    </>
  );
};

export default HeaderChat;
