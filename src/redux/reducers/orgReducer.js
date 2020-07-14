// set event list to action payload
const orgReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default orgReducer;
