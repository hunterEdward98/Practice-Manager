import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* addEvents(action) {
    try {
        console.log('POSTING DATA:', action.payload)
        yield axios.post(`/api/event`, action.payload);
        console.log('POSTED DATA:', action.payload)
        yield put({ type: 'FETCH_EVENTS' });

        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* getEvents() {
    try {
        const events = yield axios.get(`/api/event`);
        console.log('items', events);
        yield put({ type: 'SET_EVENTS', payload: events.data });

        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* EventsSaga() {
    yield takeLatest('FETCH_EVENTS', getEvents);
    yield takeLatest('ADD_EVENT', addEvents);
}

export default EventsSaga;
