import { toast } from "react-toastify";
import * as ClassApi from "../api/ClassRequest";

export const createClass = (className, classAdmin, users, snippet, image, setFetchAgain, fetchAgain) => async () => {
    try {
      await ClassApi.createClass(className, classAdmin, users, snippet, image);
      setFetchAgain(!fetchAgain)
    } catch (error) {
      console.log(error);
    }
  };

export const deleteClass = (id, classAdmin, isAdmin, setFetchAgain, fetchAgain) => async () => {
  try {
    console.log("HELOSAD");
    const {data} = await ClassApi.deleteClass(id, classAdmin, isAdmin);
    if (data) {
      setFetchAgain(!fetchAgain)
      toast.success("Updated class successfully");
    } else {
      toast.error("Failed to update class");
    }
  } catch (error) {
    toast.error("Failed to update class");
    console.log(error)
  }
};
