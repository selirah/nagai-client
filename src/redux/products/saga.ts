import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import productActions from './actions'
import { Product } from 'classes'

function* addProduct({
  payload
}: {
  type: string
  payload: Product
}): Generator {
  try {
    const res: any = yield call(callApiPost, '/products', payload)
    yield put(productActions.addProductSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(productActions.addProductFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateProduct({
  payload
}: {
  type: string
  payload: Product
}): Generator {
  try {
    const res: any = yield call(callApiPut, '/products', payload, payload.id)
    yield put(productActions.updateProductSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(productActions.updateProductFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteProduct({
  payload
}: {
  type: string
  payload: string
}): Generator {
  try {
    yield call(callApiDelete, '/products', payload)
    yield put(productActions.deleteProductSuccess(payload))
  } catch (err) {
    if (err && err.response) {
      yield put(productActions.deleteProductFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getProducts(): Generator {
  try {
    const res: any = yield call(callApiGet, '/products')
    yield put(productActions.getProductsSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(productActions.getProductsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddProduct() {
  yield takeEvery(ActionTypes.ADD_PRODUCT_REQUEST, addProduct)
}

function* watchUpdateProduct() {
  yield takeEvery(ActionTypes.UPDATE_PRODUCT_REQUEST, updateProduct)
}

function* watchDeleteProduct() {
  yield takeEvery(ActionTypes.DELETE_PRODUCT_REQUEST, deleteProduct)
}

function* watchGetProducts() {
  yield takeEvery(ActionTypes.GET_PRODUCTS_REQUEST, getProducts)
}

function* productsSaga(): Generator {
  yield all([
    fork(watchAddProduct),
    fork(watchUpdateProduct),
    fork(watchDeleteProduct),
    fork(watchGetProducts)
  ])
}

export default productsSaga
