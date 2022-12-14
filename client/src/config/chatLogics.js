export const getSender = (loggedUser, users) => {
  try {
    return users[0]._id === loggedUser._id
      ? users[1].lastname
      : users[0].lastname;
  } catch (error) {
    return "";
  }
};

export const getFullSender = (loggedUser, users) => {
  try {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  } catch (error) {
    return "";
  }
};

export const isSameSender = (messages, mess, i, userId) => {
  try {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== mess.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  } catch (error) {
    return "";
  }
};

export const isSameUser = (messages, m, i) => {
  try {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  } catch (error) {
    return "";
  }
};

export const isLastMessage = (messages, i, userId) => {
  try {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId._id &&
      messages[messages.length - 1].sender._id
    );
  } catch (error) {
    return
  }
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  try {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender?._id === m.sender?._id &&
      messages[i].sender?._id !== userId
    )
      return "2.6rem";
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender?._id !== m.sender?._id &&
        messages[i].sender?._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender?._id !== userId)
    )
      return 0;
    else return "auto";
  } catch (error) {
    return "auto"
  }
};
