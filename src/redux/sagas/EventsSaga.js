import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* deleteEvent(action) {
    try {
        yield axios.delete(`/api/event/${action.payload}`);
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

function* getEvents() {
    try {
        const events = yield axios.get(`/api/event`);
        yield put({ type: 'SET_EVENTS', payload: events.data });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* EventsSaga() {
    yield takeLatest('FETCH_EVENTS', getEvents);
    yield takeLatest('ADD_EVENT', addEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default EventsSaga;
