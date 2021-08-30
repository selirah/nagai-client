import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import { callApiDelete, callApiPost, callApiPut, callApiGet } from 'api'
import territoryActions from './actions'
import { TerritoryFields, Param } from 'classes'

function* addTerritory({
  payload
}: {
  type: string
  payload: TerritoryFields
}): Generator {
  try {
    const res: any = yield call(callApiPost, 'territories', payload)
    if (res.status === 201) {
      yield put(territoryActions.addTerritorySuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(territoryActions.addTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* updateTerritory({
  payload
}: {
  type: string
  payload: TerritoryFields
}): Generator {
  try {
    const res: any = yield call(callApiPut, 'territories', payload, payload.id)
    if (res.status === 200) {
      yield put(territoryActions.updateTerritorySuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(territoryActions.updateTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* deleteTerritory({
  payload
}: {
  type: string
  payload: number
}): Generator {
  try {
    const res: any = yield call(callApiDelete, 'territories', payload)
    if (res.status === 200) {
      yield put(territoryActions.deleteTerritorySuccess(payload))
    }
  } catch (err) {
    if (err && err.response) {
      yield put(territoryActions.deleteTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* getTerritories({
  payload
}: {
  type: string
  payload: Param
}): Generator {
  try {
    const res: any = yield call(
      callApiGet,
      `territories?page=${payload.page}&skip=${payload.skip}&query=${payload.query}&region=${payload.region}`
    )
    yield put(territoryActions.getTerritorySuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(territoryActions.getTerritoryFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchAddTerritory() {
  yield takeEvery(ActionTypes.ADD_TERRITORY_REQUEST, addTerritory)
}

function* watchUpdateTerritory() {
  yield takeEvery(ActionTypes.UPDATE_TERRITORY_REQUEST, updateTerritory)
}

function* watchDeleteTerritory() {
  yield takeEvery(ActionTypes.DELETE_TERRITORY_REQUEST, deleteTerritory)
}

function* watchGetTerritories() {
  yield takeEvery(ActionTypes.GET_TERRITORY_REQUEST, getTerritories)
}

function* territorySaga(): Generator {
  yield all([
    fork(watchAddTerritory),
    fork(watchUpdateTerritory),
    fork(watchDeleteTerritory),
    fork(watchGetTerritories)
  ])
}

export default territorySaga
