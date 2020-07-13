import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment'
function* deleteTime(action) {
  try {
    yield axios.delete(`/api/time/${action.payload.id}`);
    yield put({ type: 'FETCH_TIMES', payload: action.payload.athId });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}
function* editTime(action) {
  try {
    yield axios.put(`/api/time/`, action.payload);
    yield put({ type: 'FETCH_TIMES', payload: action.payload.athId });
  } catch (error) {
    console.log('Error with athlete edit:', error);
  }
}
function* getTimes(action) {
  try {
    const items = yield axios.get(`/api/time/athlete/${action.payload}`);
    yield put({ type: 'SET_TIMES', payload: items.data });
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
