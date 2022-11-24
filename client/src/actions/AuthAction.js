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
  (formData, resetForm, setFormState) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.signUp(formData);
      if (!data) {
        toast.error("Failed to create new user");
      } else {
        dispatch({ type: "SIGNUP_SUCCESS" });
        toast.success(
          "Created user successfully, check your mail to active account"
        );
        setFormState("Verify");
        await AuthApi.activeCodeSender(formData.username);
        console.log("asd");
        resetForm();
      }
    } catch (error) {
      dispatch({ type: "AUTH_FAIL" });
      console.log(error);
    }
  };

export const signUpByAdmin =
  (formData, fetchAgain, setFetchAgain) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.signUpByAdmin(formData);
      if (!data) {
        toast.warn("username is already registered!");
      } else {
        toast.success("Created user successfully!");
        setFetchAgain(!fetchAgain);
      }
    } catch (error) {
      dispatch({ type: "AUTH_FAIL" });
      toast.error("Failed to create new user, maybe username already exists! ");
      console.log(error);
    }
  };

export const forgotPassword = (username) => async () => {
  try {
    const { data } = await AuthApi.forgotPassword(username);
    if (data) {
      toast.success("Code has been sent to your email.");
    }
  } catch (error) {
    toast.error("Failed to sent code to your email");
    console.log(error);
  }
};

export const resetPassword =
  (password, userEmail, id, token, setFormState) => async () => {
    try {
      const { data } = await AuthApi.resetPassword(
        password,
        userEmail,
        id,
        token
      );
      if (data) {
        toast.success("Reset password is successfully");
        setFormState("Login");
      }
    } catch (error) {
      toast.error("Failed to reset password");
      console.log(error);
    }
  };

export const verifySender =
  (username, code, setFormState) => async (dispatch) => {
    dispatch({ type: "VERIFY_START" });
    try {
      const { data } = await AuthApi.verifySender(username, code);
      if (data) {
        toast.success("Verify code successfully");
        dispatch({ type: "VERIFY_SUCCESS" });
        setFormState("Login");
      }
    } catch (error) {
      toast.error("Failed to verify code");
      dispatch({ type: "VERIFY_FAIL" });
      console.log(error);
    }
  };

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const loginOutsideUser =
  (userId, username, firstname, lastname, avatar) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.loginOutsideUser(
        userId,
        username,
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
