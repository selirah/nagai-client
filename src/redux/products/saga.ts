import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from '@api/index'
import productActions from './actions'
import { ProductFields } from '@classes/Product'
import { Param } from '@classes/Param'

function* addProduct({
  payload
}: {
  type: string
  payload: ProductFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'products', payload)
    if (res.status === 201) {
      yield put(productActions.addProductSuccess())
    }
  } catch (err: any) {
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
  payload: ProductFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'products', payload, payload.id)
    if (res.status === 200) {
      yield put(productActions.updateProductSuccess())
    }
  } catch (err: any) {
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
    const res: any = yield call(callApiDelete, 'products', payload)
    if (res.status === 200) {
      yield put(productActions.deleteProductSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(productActions.deleteProductFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getProducts({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `products?page=${payload.page}&skip=${payload.skip}&category=${payload.category}&manufacturer=${payload.manufacturer}&query=${payload.query}`
    )
    yield put(productActions.getProductsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(productActions.getProductsFailure(err.response.data))
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
      `stock-trails/product/${payload.id}?page=${payload.page}&skip=${payload.skip}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`
    )
    yield put(productActions.getStockTrailsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(productActions.getStockTrailsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getSearchedProducts({
  payload
}: {
  type: string
  payload: string
}): Generator {
  try {
    const res: any = yield call(callApiGet, `products/search?q=${payload}`)
    yield put(productActions.getSearchedProductsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(productActions.getSearchedProductsFailure(err.response.data))
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

function* watchGetStockTrails() {
  yield takeEvery(ActionTypes.GET_STOCK_TRAILS_REQUEST, getStockTrails)
}

function* watchGetSearchedProducts() {
  yield takeEvery(ActionTypes.GET_PRODUCTS_SEARCH_REQUEST, getSearchedProducts)
}

function* productsSaga(): Generator {
  yield all([
    fork(watchAddProduct),
    fork(watchUpdateProduct),
    fork(watchDeleteProduct),
    fork(watchGetProducts),
    fork(watchGetStockTrails),
    fork(watchGetSearchedProducts)
  ])
}

export default productsSaga
