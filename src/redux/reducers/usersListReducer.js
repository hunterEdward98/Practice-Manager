//set users list to action payload
const usersListReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default usersListReducer;
