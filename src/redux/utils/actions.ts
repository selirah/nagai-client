import { action } from 'typesafe-actions'
import { Region, Unit } from 'classes'
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

  clearStates: () => action(ActionTypes.CLEAR_STATES)
}

export default utilsActions
