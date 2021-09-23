import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import invoiceActions from './actions'
import { InvoiceFields, Param } from 'classes'

function* addInvoice({
  payload
}: {
  type: string
  payload: InvoiceFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'invoices', payload)
    if (res.status === 201) {
      yield put(invoiceActions.addInvoiceSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(invoiceActions.addInvoiceFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateInvoice({
  payload
}: {
  type: string
  payload: InvoiceFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'invoices', payload, payload.id)
    if (res.status === 200) {
      yield put(invoiceActions.updateInvoiceSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(invoiceActions.updateInvoiceFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteInvoice({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'invoices', payload)
    if (res.status === 200) {
      yield put(invoiceActions.deleteInvoiceSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(invoiceActions.deleteInvoiceFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getInvoices({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `invoices?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(invoiceActions.getInvoicesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(invoiceActions.getInvoicesFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddInvoice() {
  yield takeEvery(ActionTypes.ADD_INVOICE_REQUEST, addInvoice)
}

function* watchUpdateInvoice() {
  yield takeEvery(ActionTypes.UPDATE_INVOICE_REQUEST, updateInvoice)
}

function* watchDeleteInvoice() {
  yield takeEvery(ActionTypes.DELETE_INVOICE_REQUEST, deleteInvoice)
}

function* watchGetInvoices() {
  yield takeEvery(ActionTypes.GET_INVOICES_REQUEST, getInvoices)
}

function* invoiceSaga(): Generator {
  yield all([
    fork(watchAddInvoice),
    fork(watchUpdateInvoice),
    fork(watchDeleteInvoice),
    fork(watchGetInvoices)
  ])
}

export default invoiceSaga
