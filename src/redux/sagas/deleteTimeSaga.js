import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* emptyShelf(action) {
  try {
    console.log(action.payload)
    yield axios.delete(`/api/time/${action.payload.targetID}`);
    console.log('made it to 9')
    yield put({ type: 'FETCH_TIMES', payload: action.payload.athId });

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('DELETE_TIME', emptyShelf);
}

export default loginSaga;
