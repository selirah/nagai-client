import { action } from 'typesafe-actions'
import {
  TerritoryObj,
  Territory,
  TerritoryFields,
  Param,
  Region
} from 'classes'
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
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getRegionsRequest: () => action(ActionTypes.GET_REGIONS_REQUEST),

  getRegionsSuccess: (data: Region[]) =>
    action(ActionTypes.GET_REGIONS_SUCCESS, data),

  getRegionsFailure: (error: any) =>
    action(ActionTypes.GET_REGIONS_FAILURE, error),

  googleDirectionRequest: (payload: any) =>
    action(ActionTypes.GOOGLE_DIRECTION_REQUEST, payload),

  googleDirectionSuccess: (data: any) =>
    action(ActionTypes.GOOGLE_DIRECTION_SUCCESS, data),

  googleDirectionFailure: (error: any) =>
    action(ActionTypes.GOOGLE_DIRECTION_FAILURE, error)
}

export default territoryActions