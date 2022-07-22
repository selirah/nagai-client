import { action } from 'typesafe-actions'
import { ManufacturerFields, Manufacturer } from '@classes/index'
import { ActionTypes } from './types'

const manufacturerActions = {
  addManufacturerRequest: (payload: ManufacturerFields) =>
    action(ActionTypes.ADD_MANUFACTURER_REQUEST, payload),

  addManufacturerSuccess: () => action(ActionTypes.ADD_MANUFACTURER_SUCCESS),

  addManufacturerFailure: (error: any) =>
    action(ActionTypes.ADD_MANUFACTURER_FAILURE, error),

  updateManufacturerRequest: (payload: ManufacturerFields) =>
    action(ActionTypes.UPDATE_MANUFACTURER_REQUEST, payload),

  updateManufacturerSuccess: () =>
    action(ActionTypes.UPDATE_MANUFACTURER_SUCCESS),

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

  setSearchText: (value: string, manufacturers: Manufacturer[]) => {
    const res = manufacturers.filter((item) => {
      const blob = `${item.name.toLowerCase()}`
      return blob.indexOf(value.replace(/ /gi, '').toLowerCase()) > -1
    })
    return action(ActionTypes.SEARCH_TEXT, { value, res })
  },

  reorderList: (list: Manufacturer[]) => action(ActionTypes.REORDER_LIST, list),

  setSortOrder: (order: 'asc' | 'desc' | 'normal') =>
    action(ActionTypes.SET_SORT_ORDER, order),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setManufacturer: (manufacturer: Manufacturer) =>
    action(ActionTypes.SET_MANUFACTURER, manufacturer)
}

export default manufacturerActions
