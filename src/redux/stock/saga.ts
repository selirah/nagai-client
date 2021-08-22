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
    if (res.status === 200) {
      yield put(stockActions.updateStockSuccess())
    }
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
    const res: any = yield call(callApiDelete, 'stock', payload)
    if (res.status === 200) {
      yield put(stockActions.deleteStockSuccess(payload))
    }
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
      `stock?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
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

function* getUnits(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/units`)
    yield put(stockActions.getUnitSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(stockActions.getUnitFailure(err.response.data))
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

function* watchGetUnits() {
  yield takeEvery(ActionTypes.GET_UNIT_REQUEST, getUnits)
}

function* stockSaga(): Generator {
  yield all([
    fork(watchAddStock),
    fork(watchUpdateStock),
    fork(watchDeleteStock),
    fork(watchGetStock),
    fork(watchGetUnits)
  ])
}

export default stockSaga
