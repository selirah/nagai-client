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
import orderSaga from './orders/saga'
import invoiceSaga from './invoices/saga'
import deliverySaga from './deliveries/saga'
import saleSaga from './sales/saga'
import paymentSaga from './payments/saga'
import homeSaga from './home/saga'

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
    fork(userSaga),
    fork(orderSaga),
    fork(invoiceSaga),
    fork(deliverySaga),
    fork(saleSaga),
    fork(paymentSaga),
    fork(homeSaga)
  ])
}
