import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//delete selected user
function* deleteUser(action) {
    try {
        yield axios.delete(`/api/user/${action.payload.id}/${action.payload.auth}/${action.payload.org_id}`)
        yield put({ type: 'FETCH_ALL_USERS' })
    } catch (error) {
        console.log(error)
    }
}
//edit selected user
function* EditUser(action) {
    try {
        yield axios.put('/api/user', action.payload)
        yield put({ type: 'FETCH_ALL_USERS' })

    } catch (error) {
        console.log(error)
    }
}
//fetch all users from the db
function* fetchUsers() {
    try {
        const response = yield axios.get('/api/user/all')
        console.log('fetched users')
        yield put({ type: 'SET_USERS', payload: response.data })
    }
    catch{
        console.log('error making fetch users request')
    }
}

function* usersListSaga() {
    yield takeLatest('EDIT_USER', EditUser);
    yield takeLatest('FETCH_ALL_USERS', fetchUsers);
    yield takeLatest('DELETE_USER', deleteUser)
}
export default usersListSaga