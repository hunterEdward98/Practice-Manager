// set event list to action payload
const eventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default eventReducer;
