import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiPost, callApiPut, callApiGet } from 'api'
import paymentActions from './actions'
import { PaymentFields, Param } from 'classes'

function* addPayment({
  payload
}: {
  type: string
  payload: PaymentFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'payments', payload)
    if (res.status === 201) {
      yield put(paymentActions.addPaymentSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(paymentActions.addPaymentFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updatePayment({
  payload
}: {
  type: string
  payload: PaymentFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'payments', payload, payload.id)
    if (res.status === 200) {
      yield put(paymentActions.updatePaymentSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(paymentActions.updatePaymentFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getPayments({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `payments?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(paymentActions.getPaymentsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(paymentActions.getPaymentsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddPayment() {
  yield takeEvery(ActionTypes.ADD_PAYMENT_REQUEST, addPayment)
}

function* watchUpdatePayment() {
  yield takeEvery(ActionTypes.UPDATE_PAYMENT_REQUEST, updatePayment)
}

function* watchGetPayments() {
  yield takeEvery(ActionTypes.GET_PAYMENTS_REQUEST, getPayments)
}

function* paymentSaga(): Generator {
  yield all([
    fork(watchAddPayment),
    fork(watchUpdatePayment),
    fork(watchGetPayments)
  ])
}

export default paymentSaga
