// @ts-nocheck
import { Avatar, Tooltip } from "@mui/material";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "config/chatLogics";
import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ message }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublicFolder = process.env.REACT_APP_FOLDER;

  return (
    <>
    <ScrollableFeed>
      {message &&
        message.map((mess, i) => (
          <div
            style={{ display: "flex", alignItems: "flex-end" }}
            key={mess._id}
          >
            {(isSameSender(message, mess, i, user._id) ||
              isLastMessage(message, i, user._id)) && (
              <Tooltip title={mess.sender.lastname} placement="bottom-start">
                <Avatar
                  cursor="pointer"
                  name={mess.sender.lastname}
                  src={
                    mess.sender.profilePicture
                      ? serverPublicFolder + mess.sender.profilePicture
                      : serverPublicFolder + "DefaultAvatar.png"
                  }
                />
              </Tooltip>
            )}
            <span
              style={{
                display: "flex",
                marginLeft: isSameSenderMargin(message, mess, i, user._id),
                maxWidth: "35rem",
                marginTop: "0.7rem",
                padding: "0.8rem",
                flexDirection: "column",
                alignSelf: "flex-end",
                color: "#fff",
                borderRadius:
                  mess.sender._id === user._id
                    ? "1rem 1rem 0 1rem"
                    : "1rem 1rem 1rem 0",
                background:
                  mess.sender._id === user._id
                    ? "linear-gradient(135deg, rgba(98,50,215,1) 0%, rgba(149,108,243,1) 100%)"
                    : "linear-gradient(315deg, rgba(178,53,95,1) 0%, rgba(250,169,130,1) 100%)",
              }}
            >
              {mess.content}
            </span>
            {/* {mess.sender._id === user._id && (
              <Tooltip title="You" placement="bottom-end">
                <Avatar
                  mt="7px"
                  cursor="pointer"
                  name={user.lastname}
                  src={
                    user.profilePicture
                      ? serverPublicFolder + user.profilePicture
                      : serverPublicFolder + "DefaultAvatar.png"
                  }
                />
              </Tooltip>
            )} */}
          </div>
        ))}
    </ScrollableFeed>
    </>
  );
};

export default ScrollableChat;
