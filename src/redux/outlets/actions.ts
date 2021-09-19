import { action } from 'typesafe-actions'
import { OutletObj, Outlet, OutletFields, Param } from 'classes'
import { ActionTypes } from './types'

const outletActions = {
  addOutletRequest: (payload: OutletFields) =>
    action(ActionTypes.ADD_OUTLETS_REQUEST, payload),

  addOutletSuccess: () => action(ActionTypes.ADD_OUTLETS_SUCCESS),

  addOutletFailure: (error: any) =>
    action(ActionTypes.ADD_OUTLETS_FAILURE, error),

  updateOutletRequest: (payload: OutletFields) =>
    action(ActionTypes.UPDATE_OUTLETS_REQUEST, payload),

  updateOutletSuccess: () => action(ActionTypes.UPDATE_OUTLETS_SUCCESS),

  updateOutletFailure: (error: any) =>
    action(ActionTypes.UPDATE_OUTLETS_FAILURE, error),

  deleteOutletRequest: (id: number) =>
    action(ActionTypes.DELETE_OUTLETS_REQUEST, id),

  deleteOutletSuccess: (id: number) =>
    action(ActionTypes.DELETE_OUTLETS_SUCCESS, id),

  deleteOutletFailure: (error: any) =>
    action(ActionTypes.DELETE_OUTLETS_FAILURE, error),

  getOutletsRequest: (params: Param) =>
    action(ActionTypes.GET_OUTLETS_REQUEST, params),

  getOutletsSuccess: (data: OutletObj) =>
    action(ActionTypes.GET_OUTLETS_SUCCESS, data),

  getOutletsFailure: (error: any) =>
    action(ActionTypes.GET_OUTLETS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setOutlet: (outlet: Outlet) => action(ActionTypes.SET_OUTLET, outlet),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default outletActions
