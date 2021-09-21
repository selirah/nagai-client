import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/saga'
import manufacturersSaga from './manufacturers/saga'
import categoriesSaga from './categories/saga'
import productsSaga from './products/saga'
import stockSaga from './stock/saga'
import territorySaga from './terrirtories/saga'
import utilsSaga from './utils/saga'
import outletSaga from './outlets/saga'
import userSaga from './users/saga'

export function* rootSaga(): Generator {
  yield all([
    fork(authSaga),
    fork(manufacturersSaga),
    fork(categoriesSaga),
    fork(productsSaga),
    fork(stockSaga),
    fork(territorySaga),
    fork(utilsSaga),
    fork(outletSaga),
    fork(userSaga)
  ])
}
