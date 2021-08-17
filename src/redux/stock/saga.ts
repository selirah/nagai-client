import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import stockActions from './actions'
import { StockFields, Param } from 'classes'

function* addStock({
  payload
}: {
  type: string
  payload: StockFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'stock', payload)
    yield put(stockActions.addStockSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(stockActions.addStockFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateStock({
  payload
}: {
  type: string
  payload: StockFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'stock', payload, payload.id)
    yield put(stockActions.updateStockSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(stockActions.updateStockFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteStock({
  payload
}: {
  type: string
  payload: string
}): Generator {
  try {
    yield call(callApiDelete, 'stock', payload)
    yield put(stockActions.deleteStockSuccess(payload))
  } catch (err) {
    if (err && err.response) {
      yield put(stockActions.deleteStockFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getStock({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `products?page=${payload.page}&skip=${payload.skip}&productId=${payload.productId}&sku=${payload.sku}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(stockActions.getStockSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(stockActions.getStockFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddStock() {
  yield takeEvery(ActionTypes.ADD_STOCK_REQUEST, addStock)
}

function* watchUpdateStock() {
  yield takeEvery(ActionTypes.UPDATE_STOCK_REQUEST, updateStock)
}

function* watchDeleteStock() {
  yield takeEvery(ActionTypes.DELETE_STOCK_REQUEST, deleteStock)
}

function* watchGetStock() {
  yield takeEvery(ActionTypes.GET_STOCK_REQUEST, getStock)
}

function* stockSaga(): Generator {
  yield all([
    fork(watchAddStock),
    fork(watchUpdateStock),
    fork(watchDeleteStock),
    fork(watchGetStock)
  ])
}

export default stockSaga
