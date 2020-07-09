import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment'
function* deleteTime(action) {
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
function* editTime(action) {
  try {
    yield axios.put(`/api/time/`, action.payload);
    console.log(action.payload, `successful edit, moving to fetch`, moment().format('h:m:s.SSS'))
    yield put({ type: 'FETCH_TIMES', payload: action.payload.athId });
  } catch (error) {
    console.log('Error with athlete edit:', error);
  }
}
// worker Saga: will be fired on "LOGOUT" actions
function* getTimes(action) {
  try {
    console.log(action.payload)
    const items = yield axios.get(`/api/time/athlete/${action.payload}`);
    console.log('items', items);
    yield put({ type: 'SET_TIMES', payload: items.data });

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* getShelfSaga() {
  yield takeLatest('FETCH_TIMES', getTimes);
  yield takeLatest('EDIT_TIME', editTime);
  yield takeLatest('DELETE_TIME', deleteTime);

}

export default getShelfSaga;
