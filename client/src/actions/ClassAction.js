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
    const {data} = await ClassApi.deleteClass(id, classAdmin, isAdmin);
    setFetchAgain(!fetchAgain)
  } catch (error) {
    console.log(error)
  }
};
