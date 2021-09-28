import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiGet, callGoogleDirection } from 'api'
import utilsActions from './actions'

function* getRegions(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/regions`)
    yield put(utilsActions.getRegionsSuccess(res.data))
  } catch (err: any) {
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
  } catch (err: any) {
    yield put(utilsActions.googleDirectionFailure(err))
  }
}

function* getUnits(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/units`)
    yield put(utilsActions.getUnitSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(utilsActions.getUnitFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getTerritories(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/territories`)
    yield put(utilsActions.getTerritoriesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(utilsActions.getTerritoriesFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getOutlets(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/outlets`)
    yield put(utilsActions.getOutletsSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(utilsActions.getOutletsFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getTaxes(): Generator {
  try {
    const res: any = yield call(callApiGet, `utils/taxes`)
    yield put(utilsActions.getTaxesSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      yield put(utilsActions.getTaxesFailure(err.response.data))
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

function* watchGetTerritories() {
  yield takeEvery(ActionTypes.GET_TERRITORIES_REQUEST, getTerritories)
}

function* watchGetOutlets() {
  yield takeEvery(ActionTypes.GET_OUTLETS_REQUEST, getOutlets)
}

function* watchGetTaxes() {
  yield takeEvery(ActionTypes.GET_TAXES_REQUEST, getTaxes)
}

function* utilsSaga(): Generator {
  yield all([
    fork(watchGetRegions),
    fork(watchGoogleDirection),
    fork(watchGetUnits),
    fork(watchGetTerritories),
    fork(watchGetOutlets),
    fork(watchGetTaxes)
  ])
}

export default utilsSaga
