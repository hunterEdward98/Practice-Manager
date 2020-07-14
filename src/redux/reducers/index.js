import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import event from './eventReducer'
import user from './userReducer';
import time from './timeReducer';
import athlete from './athleteReducer'
import orgs from './orgReducer'
import users from './usersListReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  athlete,//contains our athletes list
  time,//contains our times list
  event,//contains our events list
  users,//contains our users list
  orgs
});

export default rootReducer;
