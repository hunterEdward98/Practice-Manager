import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
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
}

export default EventsSaga;
