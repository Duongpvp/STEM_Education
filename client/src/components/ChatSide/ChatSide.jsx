// @ts-nocheck
import { Avatar, AvatarBadge, Box, Heading } from "@chakra-ui/react";
import { AddOutlined } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Tooltip } from "@mui/material";
import { selectChat } from "actions/ChatAction";
import { fetchChat } from "api/ChatRequest";
import GroupChatModal from "components/GroupChatModal/GroupChatModal";
import { getFullSender, getSender } from "config/chatLogics";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChatSide.css";

const ChatSide = ({location}) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const userOnline = useSelector((state) => state.UserReducer.onlineUser);
  const chatStore = useSelector((state) => state.ChatReducer);

  const serverPublicFolder = process.env.REACT_APP_FOLDER;

  const [myChat, setMychat] = useState();

  const chats = useSelector((state) => state.ChatReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await fetchChat();
      setMychat(data);
    };
    fetchChats();
  }, [chatStore]);

  const handleClick = (event, chat) => {
    event.preventDefault();
    dispatch(selectChat(chat));
  };

  const checkOnlineUser = (chat) => {
    const chatMembers = chat.users.find((member) => member !== user._id);
    const online = userOnline.find((user) => user.userId === chatMembers._id);
    return online ? true : false;
  };

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      }
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowDimensions;
  }
  
  const { height, width } = useWindowDimensions();

  return (
    <Box
      display={ width < 768 && location === "chat" ? "none" : "flex"}
      flexDirection="column"
      alignItems="center"
      backgroundColor="#fff"
      borderRadius="0.75rem"
      width="375px"
      height="100%"
      my="12px"
    >
      { location === "chat" && <Box
        py={2}
        px={3}
        fontSize="1rem"
        display="flex"
        width="100%"
        justifyContent="space-around"
        alignItems="center"
      >
        <span>LOGO-CHAT</span>
        <GroupChatModal>
          <Button
            style={{ backgroundColor: "#6a1b9a" }}
            variant="contained"
            endIcon={<AddOutlined />}
          >
            New Chats
          </Button>
        </GroupChatModal>
      </Box>}
      <Box
        display="flex"
        flexDirection="column"
        padding="12px"
        backgroundColor="#FBF6FC"
        width="85%"
        height="90%"
        borderRadius="0.8rem"
        overflow="hidden"
      >
        {myChat ? (
          <>
            <Heading as="h4" size="lg" textTransform="uppercase">
              User Chat
            </Heading>
            <Stack overflow="scroll" height="320px">
              {myChat.map((chat) => {
                return (
                  <div key={chat._id}>
                    {!chat.isGroupChat && chat.users.length > 0 && (
                      <Box width="100%">
                        <Tooltip
                          title={
                            chat.isGroupChat
                              ? chat.chatName
                              : getSender(user, chat.users)
                          }
                          placement="right-start"
                          arrow
                          key={chat._id}
                        >
                          <Box
                            id={chat._id}
                            onClick={(e) => handleClick(e, chat)}
                            cursor="pointer"
                            bg={
                              chats.selectChat === chat._id
                                ? "#a76afc"
                                : "#e8e8e8"
                            }
                            _hover={{
                              background: "#a76afc",
                              color: "#fff",
                            }}
                            display="flex"
                            width="100%"
                            alignItems="center"
                            color={
                              chats.selectChat === chat._id ? "#fff" : "#000"
                            }
                            px={20}
                            py={12}
                            mb={2}
                            borderRadius="0.5rem"
                            justifyContent="flex-start"
                          >
                            {console.log("Chat : ",chat)}
                            <Avatar
                              src={
                                getFullSender(user, chat.users).outsideId
                                  ? getFullSender(user, chat.users)
                                      .profilePicture
                                  : getFullSender(user, chat.users)
                                      .profilePicture
                                  ? serverPublicFolder +
                                    getFullSender(user, chat.users)
                                      .profilePicture
                                  : serverPublicFolder + "DefaultAvatar.png"
                              }
                              width="32px"
                              height="32px"
                              borderRadius="50%"
                              marginRight="12px"
                            >
                              {checkOnlineUser(chat) && (
                                <AvatarBadge
                                  border="3px solid #fff"
                                  boxSize="1em"
                                  bgColor="#20bc1e"
                                  borderRadius="50%"
                                />
                              )}
                            </Avatar>
                            <Box display="flex" flexDirection="column">
                              <span className="sender">
                                {!chat.isGroupChat
                                  ? getSender(user, chat?.users)
                                  : chat.chatName}
                              </span>
                              <span className="latest-mess">
                                {chat.latestMessage?.sender?.lastname} :
                                {chat.latestMessage?.content}
                              </span>
                            </Box>
                          </Box>
                        </Tooltip>
                      </Box>
                    )}
                  </div>
                );
              })}
            </Stack>
            <Heading as="h4" size="lg" textTransform="uppercase">
              Group Chat
            </Heading>
            <Stack overflow="scroll" height="320px">
              {myChat.map((chat) => {
                return (
                  <div key={chat._id}>
                    {chat.isGroupChat && (
                      <Box height="50%" width="100%">
                        <Tooltip
                          title={
                            chat.isGroupChat
                              ? chat.chatName
                              : getSender(user, chat?.users)
                          }
                          placement="right-start"
                          arrow
                          key={chat._id}
                        >
                          <Box
                            id={chat._id}
                            onClick={(e) => handleClick(e, chat)}
                            cursor="pointer"
                            bg={
                              chats.selectChat === chat._id
                                ? "#a76afc"
                                : "#e8e8e8"
                            }
                            _hover={{
                              background: "#a76afc",
                              color: "#fff",
                            }}
                            display="flex"
                            width="100%"
                            alignItems="center"
                            color={
                              chats.selectChat === chat._id ? "#fff" : "#000"
                            }
                            px={20}
                            py={12}
                            mb={2}
                            borderRadius="0.5rem"
                            justifyContent="flex-start"
                          >
                            <Box display="flex" flexDirection="column">
                              <span className="sender">
                                {!chat.isGroupChat
                                  ? getSender(user, chat?.users)
                                  : chat.chatName}
                              </span>
                              {chat.latestMessage && (
                                <span className="latest-mess">
                                  {chat.latestMessage?.sender?.lastname} :
                                  {chat.latestMessage?.content}
                                </span>
                              )}
                            </Box>
                          </Box>
                        </Tooltip>
                      </Box>
                    )}
                  </div>
                );
              })}
            </Stack>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatSide;
