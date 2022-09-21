// @ts-nocheck
import { Box } from "@chakra-ui/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
import { notificationSend, selectChat } from "actions/ChatAction";
import { userOnline } from "actions/UserAction";
import { fetchMessage, sendMessage } from "api/MessageRequest";
import InfoModal from "components/InfoModal/InfoModal";
import ScrollableChat from "components/ScrollableChat/ScrollableChat";
import UpdateGroupModal from "components/UpdateGroupModal/UpdateGroupModal";
import { getFullSender, getSender } from "config/chatLogics";
import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

var compareSelectChat;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const chats = useSelector((state) => state.ChatReducer);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiveMess, setReceiveMess] = useState([]);
  const [notification, setNotification] = useState([]);
  // const [typing, setTyping] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  // const [socketConnected, setSocketConnected] = useState(false);

  const socket = useRef();

  const fetchMessages = async () => {
    if (!chats.selectChat) return;
    try {
      const { data } = await fetchMessage(chats.selectChat._id);
      setMessages(data);
      socket.current.emit("join chat", chats.selectChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendUserMessage = async () => {
    if (newMessage) {
      socket.current.emit("stop typing", chats.selectChat._id);
      try {
        setNewMessage("");
        const { data } = await sendMessage(chats.selectChat._id, newMessage);
        socket.current.emit("send-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // CONNECT TO SOCKET IO
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("setup", user);
    // socket.current.on("typing", () => setIsTyping(true));
    // socket.current.on("stop typing", () => setIsTyping(false));
    socket.current.emit("active-user", user._id);
    socket.current.on("get-users", (user) => {
      setOnlineUsers(user);
      dispatch(userOnline);
    });
  }, []);

  // FETCH MESSAGES
  useEffect(() => {
    fetchMessages();
    compareSelectChat = chats.selectChat;
  }, [chats.selectChat]);

  // RECEIVED MESSAGES
  useEffect(() => {
    socket.current.on("receive-message", (receivedData) => {
      if (
        !compareSelectChat || // if chat is not selected or doesn't match current chat
        compareSelectChat._id !== receivedData?.chat?._id
      ) {
        if (!notification.includes(receivedData)) {
          setNotification([...notification, receivedData]);
          dispatch(notificationSend([...notification, receivedData]));
          // setNotification([receivedData, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        dispatch(selectChat(receivedData.chat));
        // setMessages([...messages, receivedData]);
        setReceiveMess([...messages, receivedData]);
      }
    });
  });

  useEffect(() => {
    setMessages(receiveMess);
  }, [receiveMess]);

  const typingHandler = (newMessage) => {
    setNewMessage(newMessage);

    // if (!socketConnected) return;

    // if (typing) {
    //   setTyping(true);
    //   console.log(typing);
    //   socket.current.emit("typing", (chats.selectChat._id));
    // }
    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     socket.current.emit("stop typing", (chats.selectChat._id));
    //     setTyping(false);
    //   }
    // }, timerLength);
  };

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
            <ArrowBackIcon
              display="flex"
              fontSize="32px"
              onClick={() => dispatch(selectChat(null))}
            />
            {messages && !chats.selectChat.isGroupChat ? (
              <>
                {getSender(user, chats?.selectChat?.users)}
                <InfoModal
                  user={getFullSender(user, chats.selectChat?.users)}
                  fetchMessages={fetchMessages}
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
            )}
          </div>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p="12px"
            mx="18px"
            width="97%"
            height="85%"
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
                {/* {isTyping ? <div>Typing...</div> : <></>} */}
                <ScrollableChat message={messages} />
              </div>
            )}
            <InputEmoji
              value={newMessage}
              onChange={typingHandler}
              cleanOnEnter
              onEnter={sendUserMessage}
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
  );
};

export default SingleChat;
