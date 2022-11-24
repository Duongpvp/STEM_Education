import { toast } from "react-toastify";
import * as ClassApi from "../api/ClassRequest";

export const createClass =
  (className, classAdmin, users, snippet, image, setFetchAgain, fetchAgain) =>
  async () => {
    try {
      const { data } = await ClassApi.createClass(
        className,
        classAdmin,
        users,
        snippet,
        image
      );
      if (data) {
        setFetchAgain(!fetchAgain);
        toast.success("Created class successfully");
      } else {
        toast.success("Failed to created class");
      }
    } catch (error) {
      toast.error("Failed to created class");
      console.log(error);
    }
  };

export const deleteClassPost =
  (id, postId, setFetchAgain, fetchAgain) => async () => {
    try {
      await ClassApi.deletedClassPost(id, postId);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteClass =
  (id, classAdmin, isAdmin, setFetchAgain, fetchAgain, setDeleteOpened) =>
  async () => {
    try {
      const { data } = await ClassApi.deleteClass(id, classAdmin, isAdmin);
      if (data) {
        setFetchAgain(!fetchAgain);
        toast.success("Updated class successfully");
        setDeleteOpened(false);
      } else {
        toast.error("Failed to update class");
      }
    } catch (error) {
      toast.error("Failed to update class");
      console.log(error);
    }
  };
