import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from '@api/index'
import categoriesActions from './actions'
import { Category } from '@classes/Category'

function* addCategory({
  payload
}: {
  type: string
  payload: Category
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'categories', payload)
    if (res.status === 201) {
      yield put(categoriesActions.addCategorySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(categoriesActions.addCategoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateCategory({
  payload
}: {
  type: string
  payload: Category
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'categories', payload, payload.id)
    if (res.status === 200) {
      yield put(categoriesActions.updateCategorySuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(categoriesActions.updateCategoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteCategory({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'categories', payload)
    if (res.status === 200) {
      yield put(categoriesActions.deleteCategorySuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(categoriesActions.deleteCategoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getCategories(): Generator {
  try {
    const res: any = yield call(callApiGet, 'categories')
    yield put(categoriesActions.getCategoriesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(categoriesActions.getCategoriesFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddCategory() {
  yield takeEvery(ActionTypes.ADD_CATEGORY_REQUEST, addCategory)
}

function* watchUpdateCategory() {
  yield takeEvery(ActionTypes.UPDATE_CATEGORY_REQUEST, updateCategory)
}

function* watchDeleteCategory() {
  yield takeEvery(ActionTypes.DELETE_CATEGORY_REQUEST, deleteCategory)
}

function* watchGetCategories() {
  yield takeEvery(ActionTypes.GET_CATEGORIES_REQUEST, getCategories)
}

function* categoriesSaga(): Generator {
  yield all([
    fork(watchAddCategory),
    fork(watchUpdateCategory),
    fork(watchDeleteCategory),
    fork(watchGetCategories)
  ])
}

export default categoriesSaga
