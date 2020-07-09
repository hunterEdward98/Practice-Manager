import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* emptyShelf(action) {
  try {
    console.log('delete request sent with data:', action.payload.id)
    yield axios.delete(`/api/time/${action.payload.id}`);
    console.log('successful delete, fetching with data: ', action.payload.athId)
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
