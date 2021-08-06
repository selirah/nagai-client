import { Manufacturer } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@manufacturers/SUBMITTING',
  GET_MANUFACTURERS_REQUEST = '@@manufacturers/GET_MANUFACTURERS_REQUEST',
  GET_MANUFACTURERS_SUCCESS = '@@manufacturers/GET_MANUFACTURERS_SUCCESS',
  GET_MANUFACTURERS_FAILURE = '@@manufacturers/GET_MANUFACTURERS_FAILURE',
  ADD_MANUFACTURER_REQUEST = '@@manufacturers/ADD_MANUFACTURERS_REQUEST',
  ADD_MANUFACTURER_SUCCESS = '@@manufacturers/ADD_MANUFACTURERS_SUCCESS',
  ADD_MANUFACTURER_FAILURE = '@@manufacturers/ADD_MANUFACTURERS_FAILURE',
  UPDATE_MANUFACTURER_REQUEST = '@@manufacturers/UPDATE_MANUFACTURERS_REQUEST',
  UPDATE_MANUFACTURER_SUCCESS = '@@manufacturers/UPDATE_MANUFACTURERS_SUCCESS',
  UPDATE_MANUFACTURER_FAILURE = '@@manufacturers/UPDATE_MANUFACTURERS_FAILURE',
  DELETE_MANUFACTURER_REQUEST = '@@manufacturers/DELETE_MANUFACTURERS_REQUEST',
  DELETE_MANUFACTURER_SUCCESS = '@@manufacturers/DELETE_MANUFACTURERS_SUCCESS',
  DELETE_MANUFACTURER_FAILURE = '@@manufacturers/DELETE_MANUFACTURERS_FAILURE',
  EXPORT_MANUFACTURERS_REQUEST = '@@manufacturers/EXPORT_MANUFACTURERS_REQUEST',
  EXPORT_MANUFACTURERS_SUCCESS = '@@manufacturers/EXPORT_MANUFACTURERS_SUCCESS',
  EXPORT_MANUFACTURERS_FAILURE = '@@manufacturers/EXPORT_MANUFACTURERS_FAILURE',
  CLEAR_STATES = '@@manufacturers/CLEAR_STATES',
  SEARCH_TEXT = '@@manufacturers/SEARCH_TEXT',
  REORDER_LIST = '@@manufacturers/REORDER_LIST',
  SET_SORT_ORDER = '@@manufacturers/SET_SORT_ORDER',
  SET_ACTIVE_LINK = '@@manufacturers/SET_ACTIVE_LINK',
  SET_MANUFACTURER = '@@manufacturers/SET_MANUFACTURER'
}

export type ManufacturerState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly manufacturers: Manufacturer[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly searchText: string
  readonly filtered: Manufacturer[]
  readonly sortBy: 'asc' | 'desc' | 'normal'
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly manufacturer: Manufacturer | null
}
