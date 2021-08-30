import { action } from 'typesafe-actions'
import { TerritoryObj, Territory, TerritoryFields, Param } from 'classes'
import { ActionTypes } from './types'

const territoryActions = {
  addTerritoryRequest: (payload: TerritoryFields) =>
    action(ActionTypes.ADD_TERRITORY_REQUEST, payload),

  addTerritorySuccess: () => action(ActionTypes.ADD_TERRITORY_SUCCESS),

  addTerritoryFailure: (error: any) =>
    action(ActionTypes.ADD_TERRITORY_FAILURE, error),

  updateTerritoryRequest: (payload: TerritoryFields) =>
    action(ActionTypes.UPDATE_TERRITORY_REQUEST, payload),

  updateTerritorySuccess: () => action(ActionTypes.UPDATE_TERRITORY_SUCCESS),

  updateTerritoryFailure: (error: any) =>
    action(ActionTypes.UPDATE_TERRITORY_FAILURE, error),

  deleteTerritoryRequest: (id: number) =>
    action(ActionTypes.DELETE_TERRITORY_REQUEST, id),

  deleteTerritorySuccess: (id: number) =>
    action(ActionTypes.DELETE_TERRITORY_SUCCESS, id),

  deleteTerritoryFailure: (error: any) =>
    action(ActionTypes.DELETE_TERRITORY_FAILURE, error),

  getTerritoryRequest: (params: Param) =>
    action(ActionTypes.GET_TERRITORY_REQUEST, params),

  getTerritorySuccess: (data: TerritoryObj) =>
    action(ActionTypes.GET_TERRITORY_SUCCESS, data),

  getTerritoryFailure: (error: any) =>
    action(ActionTypes.GET_TERRITORY_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setTerritory: (territory: Territory) =>
    action(ActionTypes.SET_TERRITORY, territory),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default territoryActions
