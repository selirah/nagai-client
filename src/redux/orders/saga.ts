import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from '@api/index'
import orderActions from './actions'
import { OrderFields } from '@classes/Order'
import { Param } from '@classes/Param'

function* addOrder({
  payload
}: {
  type: string
  payload: OrderFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'orders', payload)
    if (res.status === 201) {
      yield put(orderActions.addOrderSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(orderActions.addOrderFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateOrder({
  payload
}: {
  type: string
  payload: OrderFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'orders', payload, payload.id)
    if (res.status === 200) {
      yield put(orderActions.updateOrderSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(orderActions.updateOrderFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteOrder({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'orders', payload)
    if (res.status === 200) {
      yield put(orderActions.deleteOrderSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(orderActions.deleteOrderFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getOrders({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `orders?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&status=${payload.status}`
    )
    yield put(orderActions.getOrdersSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(orderActions.getOrdersFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddOrder() {
  yield takeEvery(ActionTypes.ADD_ORDER_REQUEST, addOrder)
}

function* watchUpdateOrder() {
  yield takeEvery(ActionTypes.UPDATE_ORDER_REQUEST, updateOrder)
}

function* watchDeleteOrder() {
  yield takeEvery(ActionTypes.DELETE_ORDER_REQUEST, deleteOrder)
}

function* watchGetOrders() {
  yield takeEvery(ActionTypes.GET_ORDERS_REQUEST, getOrders)
}

function* orderSaga(): Generator {
  yield all([
    fork(watchAddOrder),
    fork(watchUpdateOrder),
    fork(watchDeleteOrder),
    fork(watchGetOrders)
  ])
}

export default orderSaga
