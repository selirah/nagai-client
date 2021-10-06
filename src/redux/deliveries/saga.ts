import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import deliveryActions from './actions'
import { DeliveryFields, Param } from 'classes'

function* addDelivery({
  payload
}: {
  type: string
  payload: DeliveryFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'deliveries', payload)
    if (res.status === 201) {
      yield put(deliveryActions.addDeliverySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(deliveryActions.addDeliveryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateDelivery({
  payload
}: {
  type: string
  payload: DeliveryFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'deliveries', payload, payload.id)
    if (res.status === 200) {
      yield put(deliveryActions.updateDeliverySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(deliveryActions.updateDeliveryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteDelivery({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'deliveries', payload)
    if (res.status === 200) {
      yield put(deliveryActions.deleteDeliverySuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(deliveryActions.deleteDeliveryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getDeliveries({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `deliveries?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(deliveryActions.getDeliveriesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(deliveryActions.getDeliveriesFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddDelivery() {
  yield takeEvery(ActionTypes.ADD_DELIVERY_REQUEST, addDelivery)
}

function* watchUpdateDelivery() {
  yield takeEvery(ActionTypes.UPDATE_DELIVERY_REQUEST, updateDelivery)
}

function* watchDeleteDelivery() {
  yield takeEvery(ActionTypes.DELETE_DELIVERY_REQUEST, deleteDelivery)
}

function* watchGetDeliveries() {
  yield takeEvery(ActionTypes.GET_DELIVERIES_REQUEST, getDeliveries)
}

function* invoiceSaga(): Generator {
  yield all([
    fork(watchAddDelivery),
    fork(watchUpdateDelivery),
    fork(watchDeleteDelivery),
    fork(watchGetDeliveries)
  ])
}

export default invoiceSaga
