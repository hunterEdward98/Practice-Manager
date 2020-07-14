import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert'

// worker Saga: will be fired on "LOGOUT" actions
function* getOrgs() {
    try {
        const orgs = yield axios.get(`/api/org`);
        yield put({ type: 'SET_ORGS', payload: orgs.data });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* addOrg(action) {
    try {
        yield axios.post(`/api/org`, action.payload);
        yield put({ type: 'FETCH_ORGS' });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}
function* deleteOrg(action) {
    try {
        const athletes = yield axios.get(`/api/org/athletes/${action.payload}`).data
        if (athletes) {
            for (const athl of athletes) {
                yield axios.delete(`/api/athlete/${athl.id}/${action.payload}`)
            }
        }
        yield axios.delete(`/api/org/${action.payload}`);
        yield put({ type: 'FETCH_ORGS' });
    } catch (error) {
        swal('Error with deletion:', error);
    }
}
function* EventsSaga() {
    yield takeLatest('FETCH_ORGS', getOrgs);
    yield takeLatest('ADD_ORG', addOrg);

    yield takeLatest('DELETE_ORG', deleteOrg);
}

export default EventsSaga;
