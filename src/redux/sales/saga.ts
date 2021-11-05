import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiPost, callApiPut, callApiGet } from '@api/index'
import saleActions from './actions'
import { SaleFields } from '@classes/Sale'
import { Param } from '@classes/Param'

function* addSale({
  payload
}: {
  type: string
  payload: SaleFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'sales', payload)
    if (res.status === 201) {
      yield put(saleActions.addSalesuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(saleActions.addSaleFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateSale({
  payload
}: {
  type: string
  payload: SaleFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'sales', payload, payload.id)
    if (res.status === 200) {
      yield put(saleActions.updateSalesuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(saleActions.updateSaleFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getSales({ payload }: { type: string; payload: Param }): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `sales?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&status=${payload.status}`
    )
    yield put(saleActions.getSalesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(saleActions.getSalesFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddSale() {
  yield takeEvery(ActionTypes.ADD_SALE_REQUEST, addSale)
}

function* watchUpdateSale() {
  yield takeEvery(ActionTypes.UPDATE_SALE_REQUEST, updateSale)
}

function* watchGetSales() {
  yield takeEvery(ActionTypes.GET_SALES_REQUEST, getSales)
}

function* saleSaga(): Generator {
  yield all([fork(watchAddSale), fork(watchUpdateSale), fork(watchGetSales)])
}

export default saleSaga
