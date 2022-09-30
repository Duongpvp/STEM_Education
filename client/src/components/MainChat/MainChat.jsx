// @ts-nocheck
import { Box } from "@chakra-ui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import { selectChat } from "actions/ChatAction";
import { fetchMessage, sendMessage } from "api/MessageRequest";
import InfoModal from "components/InfoModal/InfoModal";
import ScrollableChat from "components/ScrollableChat/ScrollableChat";
import UpdateGroupModal from "components/UpdateGroupModal/UpdateGroupModal";
import { getFullSender, getSender } from "config/chatLogics";
import React, { useState } from "react";
import { useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import "./MainChat.css";
import { useRef } from "react";
var selectedChatCompare;

const MainChat = ({ fetchAgain, setFetchAgain }) => {
  const chats = useSelector((state) => state.ChatReducer);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessageIO, setSendMessageIO] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => setOnlineUsers(users));
  }, [user]);

  // Sending message to socket server
  useEffect(() => {
    if (sendMessageIO !== null) {
      socket.current.emit("send-message", sendMessageIO);
    }
  }, [sendMessageIO]);

  // Receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("Receive: ", data);
      setReceiveMessage(data);
    });
  }, []);

  // Fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await fetchMessage(chats.selectChat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chats.selectChat !== null) {
      fetchMessages();
      selectedChatCompare = chats.selectedChat;
    }
  }, [chats.selectChat]);

  const typingHandler = (newMessage) => {
    setNewMessage(newMessage);
  };

  const sendMessages = async () => {
    // e.preventDefault();
    // Send message to socket server
    const receiverId = chats.selectChat.users.find((id) => id !== user._id);
    try {
      const { data } = await sendMessage(chats.selectChat._id, newMessage);
      setSendMessageIO({ data, receiverId });
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      receiveMessage !== null &&
      receiveMessage.chat._id === chats.selectChat._id
    ) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  return (
    <>
      {chats.selectChat ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "28px",
              padding: "0 6px 9px 6px",
              width: "97%",
              margin: "24px 28px 0 28px",
            }}
          >
            {/* <ArrowBackIcon
              display="flex"
              fontSize="32px"
              onClick={() => dispatch(selectChat(null))}
            />
            {messages && !chats.selectChat.isGroupChat ? (
              <>
                {getSender(user, chats?.selectChat?.users)}
                <InfoModal
                  user={getFullSender(user, chats.selectChat?.users)}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            ) : (
              <>
                {chats.selectChat?.chatName.toUpperCase()}
                <UpdateGroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )} */}
          </div>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p="12px"
            mx="18px"
            width="97%"
            height="92%"
            backgroundColor="#e8e8e8"
            borderRadius="0.5rem"
          >
            {chats.loading ? (
              <CircularProgress
                style={{
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  margin: "auto",
                }}
                color="secondary"
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                {messages.map((message, i) => (
                  <div
                    className={
                      message.sender._id === user._id
                        ? "message own"
                        : "message"
                    }
                    key={i}
                  >
                    <span>{message.content}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                ))}
                {/* <ScrollableChat message={messages} /> */}
              </div>
            )}
            <InputEmoji
              value={newMessage}
              onChange={typingHandler}
              cleanOnEnter
              onEnter={sendMessages}
              placeholder="Type a message"
            />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          Click on user to start chatting
        </Box>
      )}
    </>
    // <></>
  );
};

export default MainChat;
