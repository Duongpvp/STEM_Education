import * as ClassApi from "../api/ClassRequest";

export const createClass = (className, classAdmin, users, snippet) => async () => {
    try {
      await ClassApi.createClass(className, classAdmin, users, snippet);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteClass = (id, classAdmin, isAdmin) => async () => {
  try {
    const {data} = await ClassApi.deleteClass(id, classAdmin, isAdmin);
    console.log(data)
  } catch (error) {
    console.log(error)
  }
};
