import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import manufacturersSaga from './manufacturers/saga'
import categoriesSaga from './categories/saga'

export function* rootSaga(): Generator {
  yield all([fork(authSaga), fork(manufacturersSaga), fork(categoriesSaga)])
}
