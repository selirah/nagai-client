import { action } from 'typesafe-actions'
import { Region, Unit, Territory, Outlet, Tax, DBUser } from '@classes/index'
import { ActionTypes } from './types'

const utilsActions = {
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
    action(ActionTypes.GOOGLE_DIRECTION_FAILURE, error),

  getUnitRequest: () => action(ActionTypes.GET_UNIT_REQUEST),

  getUnitSuccess: (data: Unit[]) => action(ActionTypes.GET_UNIT_SUCCESS, data),

  getUnitFailure: (error: any) => action(ActionTypes.GET_UNIT_FAILURE, error),

  getTerritoriesRequest: () => action(ActionTypes.GET_TERRITORIES_REQUEST),

  getTerritoriesSuccess: (data: Territory[]) =>
    action(ActionTypes.GET_TERRITORIES_SUCCESS, data),

  getTerritoriesFailure: (error: any) =>
    action(ActionTypes.GET_TERRITORIES_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setSearchText: (value: string, territories: Territory[]) => {
    const res = territories.filter((item) => {
      const blob = `${item.locality.toLowerCase()}${item.region.region.toLowerCase()}`
      return blob.indexOf(value.replace(/ /gi, '').toLowerCase()) > -1
    })
    return action(ActionTypes.SEARCH_TEXT, { value, res })
  },

  getOutletsRequest: () => action(ActionTypes.GET_OUTLETS_REQUEST),

  getOutletsSuccess: (data: Outlet[]) =>
    action(ActionTypes.GET_OUTLETS_SUCCESS, data),

  getOutletsFailure: (error: any) =>
    action(ActionTypes.GET_OUTLETS_FAILURE, error),

  getTaxesRequest: () => action(ActionTypes.GET_TAXES_REQUEST),

  getTaxesSuccess: (data: Tax[]) => action(ActionTypes.GET_TAXES_SUCCESS, data),

  getTaxesFailure: (error: any) => action(ActionTypes.GET_TAXES_FAILURE, error),

  getUsersRequest: (role: string) =>
    action(ActionTypes.GET_USERS_REQUEST, role),

  getUsersSuccess: (data: DBUser[]) =>
    action(ActionTypes.GET_USERS_SUCCESS, data),

  getUsersFailure: (error: any) => action(ActionTypes.GET_USERS_FAILURE, error)
}

export default utilsActions
