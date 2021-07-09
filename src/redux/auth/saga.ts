import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiPost } from 'api'
import jwtDecode from 'jwt-decode'
import { authorization } from 'utils/authorization'
import authActions from './actions'
import { LoginFields, RegisterFields, User, Auth } from 'classes'
import { setItem } from 'utils/localstorage'

function setAuthorization(token: string): User {
  const user: User = jwtDecode(JSON.stringify({ token }))
  authorization(token)
  return user
}

function* login({
  payload
}: {
  type: string
  payload: LoginFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, '/users/login', payload)
    const { token } = res.data
    const user: User | any = yield setAuthorization(token)
    const result: Auth = { user, token }
    yield setItem('token', token)
    yield put(authActions.loginSuccess(result))
  } catch (err) {
    if (err && err.response) {
      yield put(authActions.loginFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* register({
  payload
}: {
  type: string
  payload: RegisterFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'users/register', payload)
    yield put(authActions.registerSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(authActions.registerFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* verifyAccount({
  payload
}: {
  type: string
  payload: any
}): Generator {
  try {
    const res: any = yield call(callApiPost, '/users/verify', payload)
    if (res.status === 200) {
      yield put(authActions.verificationSuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(authActions.verificationFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* resetPassword({
  payload
}: {
  type: string
  payload: any
}): Generator {
  try {
    const res: any = yield call(callApiPost, '/users/reset-password', payload)
    if (res.status === 200) {
      yield put(authActions.resetPasswordSuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(authActions.resetPasswordFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* resendCode({ payload }: { type: string; payload: any }): Generator {
  try {
    const res: any = yield call(callApiPost, '/users/resend-code', payload)
    if (res.status === 200) {
      yield put(authActions.resendCodeSuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(authActions.resendCodeFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchLogin() {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, login)
}

function* watchRegister() {
  yield takeEvery(ActionTypes.REGISTER_REQUEST, register)
}

function* watchVerifyAccount() {
  yield takeEvery(ActionTypes.VERIFICATION_REQUEST, verifyAccount)
}

function* watchResetPassword() {
  yield takeEvery(ActionTypes.RESET_PASSWORD_REQUEST, resetPassword)
}

function* watchResendCode() {
  yield takeEvery(ActionTypes.RESEND_CODE_REQUEST, resendCode)
}

function* authSaga(): Generator {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchVerifyAccount),
    fork(watchResetPassword),
    fork(watchResendCode)
  ])
}

export default authSaga
