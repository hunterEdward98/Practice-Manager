import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* emptyShelf(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/athlete/`, action.payload);
        console.log('successful edit, moving to fetch')
        yield put({ type: 'FETCH_ATHLETES' });

        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
    } catch (error) {
        console.log('Error with athlete edit:', error);
    }
}

function* loginSaga() {
    yield takeLatest('EDIT_ATHLETE', emptyShelf);
}

export default loginSaga;