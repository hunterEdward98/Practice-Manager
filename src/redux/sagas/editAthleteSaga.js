import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment'

// worker Saga: will be fired on "LOGOUT" actions
function* emptyShelf(action) {
    try {
        yield axios.put(`/api/athlete/`, action.payload);
        console.log(action.payload, `successful edit, moving to fetch`, moment().format('h:m:s.SSS'))
        yield put({ type: 'FETCH_ATHLETES' });
    } catch (error) {
        console.log('Error with athlete edit:', error);
    }
}

function* loginSaga() {
    yield takeLatest('EDIT_ATHLETE', emptyShelf);
}

export default loginSaga;