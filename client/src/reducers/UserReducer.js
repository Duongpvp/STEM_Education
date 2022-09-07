const UserReducer = (state = {
    userData: null,
    onlineUser: [],
}, action) => {
    switch (action.type) {
        case "SET_ONLINE_USER":
            return {
                ...state,
                onlineUser: action.data,
            }
        default:
            return state
    }
};

export default UserReducer;
