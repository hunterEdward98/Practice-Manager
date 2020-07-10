import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function deleteUser(action) {
    try {
        yield axios.delete('/api/user', action.payload)
        console.log('about to fetch after success deleting')
        yield put({ type: 'FETCH_ALL_USERS' })
    } catch (error) {
        console.log(error)
    }
}
function* EditUser(action) {
    try {
        console.log('about to edit')
        yield axios.put('/api/user', action.payload)
        console.log('about to fetch after success editing')
        yield put({ type: 'FETCH_ALL_USERS' })

    } catch (error) {
        console.log(error)
    }
}
function* fetchUsers() {
    try {
        console.log('trying to fetch')
        const response = yield axios.get('/api/user/all')
        console.log('ALL USERS: ', response.data)
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