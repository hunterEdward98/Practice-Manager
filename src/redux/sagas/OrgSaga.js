import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* deleteEvent(action) {
    try {
        yield axios.delete(`/api/org/${action.payload}`);
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}
function* addEvents(action) {
    try {
        yield axios.post(`/api/event`, action.payload);
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* getOrgs() {
    try {
        const orgs = yield axios.get(`/api/org`);
        yield put({ type: 'SET_ORGS', payload: orgs.data });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* EventsSaga() {
    yield takeLatest('FETCH_ORGS', getOrgs);
    yield takeLatest('ADD_EVENT', addEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default EventsSaga;