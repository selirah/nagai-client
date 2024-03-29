import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from '@api/index'
import manufacturerActions from './actions'
import { ManufacturerFields } from '@classes/Manufacturer'

function* addManufacturer({
  payload
}: {
  type: string
  payload: ManufacturerFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'manufacturers', payload)
    if (res.status === 201) {
      yield put(manufacturerActions.addManufacturerSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(manufacturerActions.addManufacturerFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateManufacturer({
  payload
}: {
  type: string
  payload: ManufacturerFields
}): Generator {
  try {
    const res: any = yield call(
      callApiPut,
      'manufacturers',
      payload,
      payload.id
    )
    if (res.status) {
      yield put(manufacturerActions.updateManufacturerSuccess())
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(
        manufacturerActions.updateManufacturerFailure(err.response.data)
      )
    } else {
      throw err
    }
  }
}

function* deleteManufacturer({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'manufacturers', payload)
    if (res.status === 200) {
      yield put(manufacturerActions.deleteManufacturerSuccess(payload))
    }
  } catch (err: any) {
    if (err && err.response) {
      yield put(
        manufacturerActions.deleteManufacturerFailure(err.response.data)
      )
    } else {
      throw err
    }
  }
}

function* getManufacturers(): Generator {
  try {
    const res: any = yield call(callApiGet, 'manufacturers')
    yield put(manufacturerActions.getManufacturersSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(manufacturerActions.getManufacturersFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddManufacturer() {
  yield takeEvery(ActionTypes.ADD_MANUFACTURER_REQUEST, addManufacturer)
}

function* watchUpdateManufacturer() {
  yield takeEvery(ActionTypes.UPDATE_MANUFACTURER_REQUEST, updateManufacturer)
}

function* watchDeleteManufacturer() {
  yield takeEvery(ActionTypes.DELETE_MANUFACTURER_REQUEST, deleteManufacturer)
}

function* watchGetManufacturers() {
  yield takeEvery(ActionTypes.GET_MANUFACTURERS_REQUEST, getManufacturers)
}

function* manufacturersSaga(): Generator {
  yield all([
    fork(watchAddManufacturer),
    fork(watchUpdateManufacturer),
    fork(watchDeleteManufacturer),
    fork(watchGetManufacturers)
  ])
}

export default manufacturersSaga
