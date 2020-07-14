import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';
// when ADD_ATHLETE is called, add the athlete to the DB, then get an updated list of athletes.
function* addAthlete(action) {
    try {
        yield axios.post(`/api/athlete/`, action.payload);
        yield put({ type: 'FETCH_ATHLETES' });
    } catch (error) {
        swal('Error with athlete edit:', error);
    }
}
// when EDIT_ATHLETE is called, edit the athlete in the DB, then get an updated list of athletes.
function* editAthlete(action) {
    try {
        yield axios.put(`/api/athlete/`, action.payload);
        yield put({ type: 'FETCH_ATHLETES' });
    } catch (error) {
        swal('Error with athlete edit:', error);
    }
}
function* fetchAthletes(action) {
    try {
        const response = yield axios.get('/api/athlete/');
        yield put({ type: 'SET_ATHLETES', payload: response.data });
    } catch (error) {
        swal('Error with athletes:', error);
    }
}
function* AthleteSaga() {
    yield takeLatest('FETCH_ATHLETES', fetchAthletes);
    yield takeLatest('EDIT_ATHLETE', editAthlete);
    yield takeLatest('ADD_ATHLETE', addAthlete);
}

export default AthleteSaga;
