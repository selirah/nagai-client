import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import userActions from './actions'
import {
  UserFields,
  Param,
  UserTerritoryFields,
  ChangePassword,
  Company
} from 'classes'

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

function* assignUserTerritory({
  payload
}: {
  type: string
  payload: UserTerritoryFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'user-territories', payload)
    if (res.status === 201) {
      yield put(userActions.assignUserTerritorySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.assignUserTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateUserTerritory({
  payload
}: {
  type: string
  payload: UserTerritoryFields
}): Generator {
  try {
    const res: any = yield call(
      callApiPut,
      'user-territories',
      payload,
      payload.id
    )
    if (res.status === 200) {
      yield put(userActions.updateUserTerritorySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.updateUserTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getUser({ payload }: { type: string; payload: number }): Generator {
  try {
    const res: any = yield call(callApiGet, `user/${payload}`)
    yield put(userActions.getUserSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.getUserFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* changePassword({
  payload
}: {
  type: string
  payload: ChangePassword
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'user/change-password', payload)
    if (res.status === 200) {
      yield put(userActions.changePasswordSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.changePasswordFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* addCompany({
  payload
}: {
  type: string
  payload: Company
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'company', payload)
    if (res.status === 201) {
      yield put(userActions.addCompanySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.addCompanyFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateCompany({
  payload
}: {
  type: string
  payload: Company
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'company', payload, payload.id)
    if (res.status === 200) {
      yield put(userActions.updateCompanySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.updateCompanyFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getCompany(): Generator {
  try {
    const res: any = yield call(callApiGet, 'company')
    yield put(userActions.getCompanySuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(userActions.getCompanyFailure(err.response.data))
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

function* watchAssignUserTerritory() {
  yield takeEvery(
    ActionTypes.ASSIGN_USER_TERRITORY_REQUEST,
    assignUserTerritory
  )
}

function* watchUpdateUserTerritory() {
  yield takeEvery(
    ActionTypes.UPDATE_USER_TERRITORY_REQUEST,
    updateUserTerritory
  )
}

function* watchGetUser() {
  yield takeEvery(ActionTypes.GET_USER_REQUEST, getUser)
}

function* watchChangePassword() {
  yield takeEvery(ActionTypes.CHANGE_PASSWORD_REQUEST, changePassword)
}

function* watchGetCompany() {
  yield takeEvery(ActionTypes.GET_COMPANY_REQUEST, getCompany)
}

function* watchAddCompany() {
  yield takeEvery(ActionTypes.ADD_COMPANY_REQUEST, addCompany)
}

function* watchUpdateCompany() {
  yield takeEvery(ActionTypes.UPDATE_COMPANY_REQUEST, updateCompany)
}

function* userSaga(): Generator {
  yield all([
    fork(watchAddUser),
    fork(watchUpdateUser),
    fork(watchDeleteUser),
    fork(watchGetUsers),
    fork(watchGetSearchedUsers),
    fork(watchAssignUserTerritory),
    fork(watchUpdateUserTerritory),
    fork(watchGetUser),
    fork(watchChangePassword),
    fork(watchGetCompany),
    fork(watchAddCompany),
    fork(watchUpdateCompany)
  ])
}

export default userSaga
