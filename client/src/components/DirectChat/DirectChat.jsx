// @ts-nocheck
import { Logout, Settings } from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { logOut } from "actions/AuthAction";
import { notificationSend, selectChat } from "actions/ChatAction";
import ProfileModal from "components/ProfileModal/ProfileModal";
import { getSender } from "config/chatLogics";
import React, { useState } from "react";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DirectChat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const chat = useSelector((state) => state.ChatReducer.notification);
  const [modalOpened, setModalOpened] = useState(false);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const openNoti = Boolean(anchorEl2);
  const handleClickNoti = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setAnchorEl2(null);
  };

  const handleDirectChat = (notify, notification) => {
    dispatch(selectChat(notify.chat));
    dispatch(notificationSend(notification.filter((n) => n !== notify)));
  };

  return (
    <>
      <ProfileModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={user}
      />
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Button
          id="basic-button"
          aria-controls={openNoti ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openNoti ? "true" : undefined}
          onClick={handleClickNoti}
          style={{ minWidth: "50px", position: "relative" }}
        >
          <NotificationsNoneIcon />
          <NotificationBadge
            count={chat.length}
            effect={Effect.SCALE}
            style={{ position: "absolute", top: "-20px" }}
          />
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={openNoti}
          onClose={handleCloseNoti}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {!chat.length && (
            <MenuItem>"You don't have any notifications"</MenuItem>
          )}

          {chat.map((notify) => (
            <MenuItem
              onClick={() => handleDirectChat(notify, chat)}
              key={notify._id}
            >
              {notify.chat.isGroupChat
                ? `New message in ${notify.chat.chatName}`
                : `${getSender(
                    user,
                    notify.chat.users
                  )} just sent you a messages`}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 40, height: 40 }}
              style={{boxShadow: "0 2px 8px #333"}}
              src={
                user.profilePicture
                  ? serverPublicFolder + user.profilePicture
                  : serverPublicFolder + "DefaultAvatar.png"
              }
            ></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar
              src={
                user.profilePicture
                  ? serverPublicFolder + user.profilePicture
                  : serverPublicFolder + "DefaultAvatar.png"
              }
            />
            <Link to={`/profile/${user._id}`} className="link">
              Profile
            </Link>
          </MenuItem>
          <Divider />

          <MenuItem  onClick={()=> setModalOpened(true)}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Setting
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default DirectChat;
