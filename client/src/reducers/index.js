import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import ChatReducer from "./ChatReducer";
import UserReducer from "./UserReducer";

export const reducers = combineReducers({
  AuthReducer,
  UserReducer,
  postReducer,
  ChatReducer,
});
