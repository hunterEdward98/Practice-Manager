import { put, takeLatest } from 'redux-saga/effects';
import moment from 'moment'
import axios from 'axios';

function* editAthlete(action) {
    try {
        yield axios.put(`/api/athlete/`, action.payload);
        console.log(action.payload, `successful edit, moving to fetch`, moment().format('h:m:s.SSS'))
        yield put({ type: 'FETCH_ATHLETES' });
    } catch (error) {
        console.log('Error with athlete edit:', error);
    }
}
// worker Saga: will be fired on "LOGOUT" actions
function* fetchAthletes(action) {
    try {
        const response = yield axios.get('/api/athlete/');
        console.log('successful fetch', response.data, moment().format('h:m:s.SSS'))
        yield put({ type: 'SET_ATHLETES', payload: response.data });
        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
    } catch (error) {
        console.log('Error with athletes:', error);
    }
}
function* AthleteSaga() {
    yield takeLatest('FETCH_ATHLETES', fetchAthletes);
    yield takeLatest('EDIT_ATHLETE', editAthlete);
}

export default AthleteSaga;
