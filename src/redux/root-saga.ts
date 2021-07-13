import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import manufacturerSaga from './manufacturers/saga'

export function* rootSaga(): Generator {
  yield all([fork(authSaga), fork(manufacturerSaga)])
}
