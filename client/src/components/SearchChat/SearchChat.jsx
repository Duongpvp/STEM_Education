// @ts-nocheck
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Drawer, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { accessChat } from "actions/ChatAction";
import { searchUser } from "api/UserRequest";
import UserListItems from "components/UserListItems/UserListItems";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchChat = () => {
  const [isDrawer, setDrawer] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const chats = useSelector((state) => state.ChatReducer);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      const { data } = await searchUser(search);
      setSearchResult(data);
    };
    fetchSearch();
  }, [search]);

  const accessChats = (userId, users) => {
    try {
      setDrawer(false);
      dispatch(accessChat(userId, chats, users, user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Search users to Chat">
        <Button onClick={toggleDrawer(true)}>
          <SearchIcon /> <span>Search User</span>
        </Button>
      </Tooltip>
      <Drawer open={isDrawer} onClose={toggleDrawer(false)}>
        <Box width="20vw" margin="30px" display="flex">
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt="Avatar"
            src={
              user.profilePicture
                ? serverPublicFolder + user.profilePicture
                : serverPublicFolder + "DefaultAvatar.png"
            }
          />

          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "8px",
              fontWeight: "600",
            }}
          >
            {user.firstname} {user.lastname} <br></br> {user.username}
          </span>
        </Box>
        <Box
          style={{ display: "flex", width: "320px", margin: "0 auto 8px auto" }}
        >
          <TextField
            style={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="Search by name or email"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        {searchResult?.map((user) => (
          <Box
            display="flex"
            width="88%"
            margin="0 auto"
            alignItems="center"
            key={user._id}
          >
            <UserListItems
              user={user}
              handleFunction={() => accessChats(user._id, user)}
            />
          </Box>
        ))}
      </Drawer>
    </>
  );
};

export default SearchChat;
