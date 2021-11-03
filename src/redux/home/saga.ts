import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiGet } from 'api'
import homeActions from './actions'
import { Param } from 'classes'

function* getOrderStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/orders?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getOrderStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getOrderStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getDeliveryStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/deliveries?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getDeliveryStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getDeliveryStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getSaleStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/sales?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getSaleStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getSaleStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getPaymentStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/payments?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getPaymentStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getPaymentStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getProductStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/products?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getProductStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getProductStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getStockStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/stock?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getStockStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getStockStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getInvoiceStats({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `statistics/invoices?fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(homeActions.getInvoiceStatSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(homeActions.getInvoiceStatFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchGetOrderStats() {
  yield takeEvery(ActionTypes.GET_ORDER_STAT_REQUEST, getOrderStats)
}

function* watchGetDeliveryStats() {
  yield takeEvery(ActionTypes.GET_DELIVERY_STAT_REQUEST, getDeliveryStats)
}

function* watchGetSaleStats() {
  yield takeEvery(ActionTypes.GET_SALE_STAT_REQUEST, getSaleStats)
}

function* watchGetPaymentStats() {
  yield takeEvery(ActionTypes.GET_PAYMENT_STAT_REQUEST, getPaymentStats)
}

function* watchGetProductStats() {
  yield takeEvery(ActionTypes.GET_PRODUCT_STAT_REQUEST, getProductStats)
}

function* watchGetStockStats() {
  yield takeEvery(ActionTypes.GET_STOCK_STAT_REQUEST, getStockStats)
}

function* watchGetInvoiceStats() {
  yield takeEvery(ActionTypes.GET_INVOICE_STAT_REQUEST, getInvoiceStats)
}

function* homeSaga(): Generator {
  yield all([
    fork(watchGetOrderStats),
    fork(watchGetDeliveryStats),
    fork(watchGetSaleStats),
    fork(watchGetPaymentStats),
    fork(watchGetProductStats),
    fork(watchGetStockStats),
    fork(watchGetInvoiceStats)
  ])
}

export default homeSaga
