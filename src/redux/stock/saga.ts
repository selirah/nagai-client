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
    if (res.status === 201) {
      yield put(stockActions.addStockSuccess())
    }
  } catch (err: any) {
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
    if (res.status === 200) {
      yield put(stockActions.updateStockSuccess())
    }
  } catch (err: any) {
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
    const res: any = yield call(callApiDelete, 'stock', payload)
    if (res.status === 200) {
      yield put(stockActions.deleteStockSuccess(payload))
    }
  } catch (err: any) {
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
      `stock?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(stockActions.getStockSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(stockActions.getStockFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getStockTrails({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `stock-trails/${payload.id}?page=${payload.page}&skip=${payload.skip}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(stockActions.getStockTrailsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(stockActions.getStockTrailsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getProductStock({
  payload
}: {
  type: string
  payload: string
}): Generator {
  try {
    const res: any = yield call(callApiGet, `stock/${payload}`)
    yield put(stockActions.getProductStockSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(stockActions.getProductStockFailure(err.response.data))
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

function* watchGetStockTrails() {
  yield takeEvery(ActionTypes.GET_STOCK_TRAILS_REQUEST, getStockTrails)
}

function* watchGetProductStock() {
  yield takeEvery(ActionTypes.GET_PRODUCT_STOCK_FAILURE, getProductStock)
}

function* stockSaga(): Generator {
  yield all([
    fork(watchAddStock),
    fork(watchUpdateStock),
    fork(watchDeleteStock),
    fork(watchGetStock),
    fork(watchGetStockTrails),
    fork(watchGetProductStock)
  ])
}

export default stockSaga
