import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiGet, callGoogleDirection } from 'api'
import utilsActions from './actions'

function* getRegions(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/regions`)
    yield put(utilsActions.getRegionsSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(utilsActions.getRegionsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* googleDirection({
  payload
}: {
  type: string
  payload: any
}): Generator {
  try {
    const res: any = yield call(callGoogleDirection, payload)
    if (res.status === 'OK') {
      yield put(utilsActions.googleDirectionSuccess(res))
    } else {
      yield put(utilsActions.googleDirectionFailure(res))
    }
  } catch (err) {
    yield put(utilsActions.googleDirectionFailure(err))
  }
}

function* getUnits(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/units`)
    yield put(utilsActions.getUnitSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(utilsActions.getUnitFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchGetRegions() {
  yield takeEvery(ActionTypes.GET_REGIONS_REQUEST, getRegions)
}

function* watchGoogleDirection() {
  yield takeEvery(ActionTypes.GOOGLE_DIRECTION_REQUEST, googleDirection)
}

function* watchGetUnits() {
  yield takeEvery(ActionTypes.GET_UNIT_REQUEST, getUnits)
}

function* utilsSaga(): Generator {
  yield all([
    fork(watchGetRegions),
    fork(watchGoogleDirection),
    fork(watchGetUnits)
  ])
}

export default utilsSaga
