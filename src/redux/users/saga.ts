import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import userActions from './actions'
import { UserFields, Param } from 'classes'

function* addUser({
  payload
}: {
  type: string
  payload: UserFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'users', payload)
    if (res.status === 201) {
      yield put(userActions.addUserSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.addUserFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateUser({
  payload
}: {
  type: string
  payload: UserFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'users', payload, payload.id)
    if (res.status === 200) {
      yield put(userActions.updateUserSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.updateUserFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteUser({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'users', payload)
    if (res.status === 200) {
      yield put(userActions.deleteUserSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.deleteUserFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getUsers({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `users?page=${payload.page}&skip=${payload.skip}&role=${payload.role}&query=${payload.query}`
    )
    yield put(userActions.getUsersSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.getUsersFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getSearchedUsers({
  payload
}: {
  type: string
  payload: string
}): Generator {
  try {
    const res: any = yield call(callApiGet, `users/search?q=${payload}`)
    yield put(userActions.getSearchedUsersSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.getSearchedUsersFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddUser() {
  yield takeEvery(ActionTypes.ADD_USER_REQUEST, addUser)
}

function* watchUpdateUser() {
  yield takeEvery(ActionTypes.UPDATE_USER_REQUEST, updateUser)
}

function* watchDeleteUser() {
  yield takeEvery(ActionTypes.DELETE_USER_REQUEST, deleteUser)
}

function* watchGetUsers() {
  yield takeEvery(ActionTypes.GET_USERS_REQUEST, getUsers)
}

function* watchGetSearchedUsers() {
  yield takeEvery(ActionTypes.GET_USERS_SEARCH_REQUEST, getSearchedUsers)
}

function* userSaga(): Generator {
  yield all([
    fork(watchAddUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
    fork(watchGetUsers),
    fork(watchGetSearchedUsers)
  ])
}

export default userSaga
