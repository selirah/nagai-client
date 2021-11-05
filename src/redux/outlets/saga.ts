import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from '@api/index'
import outletActions from './actions'
import { OutletFields } from '@classes/Outlet'
import { Param } from '@classes/Param'

function* addOutlet({
  payload
}: {
  type: string
  payload: OutletFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'outlets', payload)
    if (res.status === 201) {
      yield put(outletActions.addOutletSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(outletActions.addOutletFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateOutlet({
  payload
}: {
  type: string
  payload: OutletFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'outlets', payload, payload.id)
    if (res.status === 200) {
      yield put(outletActions.updateOutletSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(outletActions.updateOutletFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteOutlet({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'outlets', payload)
    if (res.status === 200) {
      yield put(outletActions.deleteOutletSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(outletActions.deleteOutletFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getOutlets({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `outlets?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&territory=${payload.territory}`
    )
    yield put(outletActions.getOutletsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(outletActions.getOutletsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getOrders({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `orders/${payload.id}?page=${payload.page}&skip=${payload.skip}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(outletActions.getOrderSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(outletActions.getOrderFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddOutlet() {
  yield takeEvery(ActionTypes.ADD_OUTLETS_REQUEST, addOutlet)
}

function* watchUpdateOutlet() {
  yield takeEvery(ActionTypes.UPDATE_OUTLETS_REQUEST, updateOutlet)
}

function* watchDeleteOutlet() {
  yield takeEvery(ActionTypes.DELETE_OUTLETS_REQUEST, deleteOutlet)
}

function* watchGetOutlets() {
  yield takeEvery(ActionTypes.GET_OUTLETS_REQUEST, getOutlets)
}

function* watchGetOrders() {
  yield takeEvery(ActionTypes.GET_ORDER_REQUEST, getOrders)
}

function* outletSaga(): Generator {
  yield all([
    fork(watchAddOutlet),
    fork(watchUpdateOutlet),
    fork(watchDeleteOutlet),
    fork(watchGetOutlets),
    fork(watchGetOrders)
  ])
}

export default outletSaga
