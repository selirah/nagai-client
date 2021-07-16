import { action } from 'typesafe-actions'
import { ManufacturerFields, Manufacturer } from 'classes'
import { ActionTypes } from './types'

const manufacturerActions = {
  addManufacturerRequest: (payload: ManufacturerFields) =>
    action(ActionTypes.ADD_MANUFACTURER_REQUEST, payload),

  addManufacturerSuccess: (data: Manufacturer) =>
    action(ActionTypes.ADD_MANUFACTURER_SUCCESS, data),

  addManufacturerFailure: (error: any) =>
    action(ActionTypes.ADD_MANUFACTURER_FAILURE, error),

  updateManufacturerRequest: (payload: ManufacturerFields) =>
    action(ActionTypes.UPDATE_MANUFACTURER_REQUEST, payload),

  updateManufacturerSuccess: (data: Manufacturer) =>
    action(ActionTypes.UPDATE_MANUFACTURER_SUCCESS, data),

  updateManufacturerFailure: (error: any) =>
    action(ActionTypes.UPDATE_MANUFACTURER_FAILURE, error),

  deleteManufacturerRequest: (id: number) =>
    action(ActionTypes.DELETE_MANUFACTURER_REQUEST, id),

  deleteManufacturerSuccess: (id: number) =>
    action(ActionTypes.DELETE_MANUFACTURER_SUCCESS, id),

  deleteManufacturerFailure: (error: any) =>
    action(ActionTypes.DELETE_MANUFACTURER_FAILURE, error),

  getManufacturersRequest: () => action(ActionTypes.GET_MANUFACTURERS_REQUEST),

  getManufacturersSuccess: (data: Manufacturer[]) =>
    action(ActionTypes.GET_MANUFACTURERS_SUCCESS, data),

  getManufacturersFailure: (error: any) =>
    action(ActionTypes.GET_MANUFACTURERS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setSearchText: (value: string) => action(ActionTypes.SEARCH_TEXT, value),

  setPageNumber: (page: number) => action(ActionTypes.SET_PAGE, page),

  reorderList: (list: Manufacturer[]) => action(ActionTypes.REORDER_LIST, list)
}

export default manufacturerActions
