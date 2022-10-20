import { toast } from "react-toastify";
import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success(" Login successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    toast.error(" Something went wrong with your account!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const signUp =
  (formData, resetForm) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.signUp(formData);
      if (!data) {
        toast.error("Failed to create new user");
      } else {
        toast.success("Created user successfully");
        await AuthApi.activeCodeSender(formData.username);
        resetForm();
      }
    } catch (error) {
      dispatch({ type: "AUTH_FAIL" });
      console.log(error);
    }
  };

export const verifySender = (username, code) => async (dispatch) => {
  dispatch({ type: "VERIFY_START" });
  try {
    const { data } = await AuthApi.verifySender(username, code);
    if (data) {
      toast.success("Verify code successfully");
      dispatch({ type: "VERIFY_SUCCESS", data: data });
    } else {
      toast.error("Failed to verify code");
    }
  } catch (error) {
    dispatch({ type: "VERIFY_FAIL" });
    console.log(error);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const loginOutsideUser =
  (userId, firstname, lastname, avatar) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.loginOutsideUser(
        userId,
        firstname,
        lastname,
        avatar
      );
      dispatch({ type: "AUTH_SUCCESS", data: data });
      toast.success(" Login successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch({ type: "AUTH_FAIL" });
      toast.error(" Something went wrong with your account!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
