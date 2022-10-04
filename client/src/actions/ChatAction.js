import * as ChatApi from "../api/ChatRequest";

export const accessChat = (id, chats, users, user) => async (dispatch) => {
  dispatch({ type: "ACCESSCHAT_START" });
  try {
    const { data } = await ChatApi.accessChat(id);
    const result = chats.chatData.find((c) => c._id === data._id);
    const accessData = { ...data, users: [user, users] };
    console.log(accessData);
    if (!result) {
      dispatch({ type: "ACCESSCHAT_SUCCESS", data: accessData });
    } else {
      console.log(data);
      dispatch({ type: "ACCESS_WITHOUT_RENDER", data: data });
    }
  } catch (error) {
    dispatch({ type: "ACCESSCHAT_FAIL" });
    console.log(error);
  }
};

export const selectChat = (chat) => async (dispatch) => {
  if (chat === null) {
    dispatch({ type: "ONLY_SELECT_CHAT", data: null });
  } else {
    dispatch({ type: "ONLY_SELECT_CHAT", data: chat });
  }
};

export const clearSelectChat = () => async (dispatch) => {
  dispatch({ type: "CLEAR_SELECT_CHAT" });
};

export const createGroupChat =
  (chatName, selectedUsers) => async (dispatch) => {
    dispatch({ type: "CREATE_GROUP_CHAT_START" });
    try {
      const { data } = await ChatApi.createGroupChat(chatName, selectedUsers);
      dispatch({ type: "CREATE_GROUP_CHAT_SUCCESS", data: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "CREATE_GROUP_CHAT_FAIL" });
    }
  };

export const renameGroupChat = (chatId, chatName) => async (dispatch) => {
  dispatch({ type: "RENAME_GROUP_CHAT_START" });
  try {
    const { data } = await ChatApi.renameGroupChat(chatId, chatName);
    dispatch({ type: "RENAME_GROUP_CHAT_SUCCESS", data: data, id: data._id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RENAME_GROUP_CHAT_FAIL" });
  }
};

export const removeUserGroup = (chatId, user) => async (dispatch) => {
  dispatch({ type: "REMOVE_USER_GROUP_START" });
  try {
    const { data } = await ChatApi.removeUserGroup(chatId, user._id);
    dispatch({ type: "REMOVE_USER_GROUP_SUCCESS", data: data, id: data._id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "REMOVE_USER_GROUP_FAIL" });
  }
};

export const addUserGroup = (chatId, userId) => async (dispatch) => {
  dispatch({ type: "ADD_USER_GROUP_START" });
  try {
    const { data } = await ChatApi.addUserGroup(chatId, userId);
    dispatch({ type: "ADD_USER_GROUP_SUCCESS", data: data, id: data._id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_USER_GROUP_FAIL" });
  }
};

export const notificationSend = (data) => async (dispatch) => {
  dispatch({ type: "SET_NOTIFICATION", data: data });
};

export const notificationFilter = (data) => async (dispatch) => {
  dispatch({ type: "FILTER_NOTIFICATION", data: data });
};
