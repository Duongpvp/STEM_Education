const ChatReducer = (
  state = {
    chatData: [],
    loading: false,
    error: false,
    selectChat: null,
    notification: [],
  },
  action
) => {
  switch (action.type) {
    // ACCESS_CHAT
    case "ACCESSCHAT_START":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: true,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "ACCESSCHAT_SUCCESS":
      return {
        ...state,
        chatData: [...state.chatData, action.data],
        loading: false,
        error: false,
        selectChat: action.data,
        notification: [...state.notification],
      };

    case "ACCESS_WITHOUT_RENDER":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        selectChat: action.data,
        notification: [...state.notification],
      };

    case "ACCESSCHAT_FAIL":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    // CREATE_GROUP_CHAT
    case "CREATE_GROUP_CHAT_START":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: true,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "CREATE_GROUP_CHAT_SUCCESS":
      return {
        ...state,
        chatData: [...state.chatData, action.data],
        loading: false,
        error: false,
        selectChat: action.data,
        notification: [...state.notification],
      };

    case "CREATE_GROUP_CHAT_FAIL":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    // RENAME_CHAT
    case "RENAME_GROUP_CHAT_START":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: true,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "RENAME_GROUP_CHAT_SUCCESS":
      let renameIndex = state.chatData.findIndex(
        (chat) => chat._id === action.id
      );
      state.chatData[renameIndex] = action.data;
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        selectChat: action.data,
        notification: [...state.notification],
      };

    case "RENAME_GROUP_CHAT_FAIL":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    // REMOVE_USER_CHAT
    case "REMOVE_USER_GROUP_START":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: true,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "REMOVE_USER_GROUP_SUCCESS":
      let removeIndex = state.chatData.findIndex(
        (chat) => chat._id === action.id
      );
      state.chatData[removeIndex] = action.data;
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: action.data,
        notification: [...state.notification],
      };

    case "REMOVE_USER_GROUP_FAIL":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    // ADD_USER_CHAT
    case "ADD_USER_GROUP_START":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: true,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "ADD_USER_GROUP_SUCCESS":
      let addUserGroupIndex = state.chatData.findIndex(
        (chat) => chat._id === action.id
      );
      state.chatData[addUserGroupIndex] = action.data;
      console.log(state.chatData[addUserGroupIndex]);
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    case "ADD_USER_GROUP_FAIL":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: true,
        selectChat: { ...state.selectChat },
        notification: [...state.notification],
      };

    // SELECT_CHAT
    case "ONLY_SELECT_CHAT":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        selectChat: action.data,
        notification: [...state.notification]
      };

    // CLEAR_SELECT
    case "CLEAR_SELECT_CHAT":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        selectChat: "",
        notification: [...state.notification],
      };

    case "SET_NOTIFICATION":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        notification: [...state.notification, action.data],
      };

    case "FILTER_NOTIFICATION":
      return {
        ...state,
        chatData: [...state.chatData],
        loading: false,
        error: false,
        notification: action.data,
      };
    default:
      return state;
  }
};

export default ChatReducer;
