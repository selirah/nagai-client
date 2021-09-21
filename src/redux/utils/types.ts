import { Unit, Region, Territory } from 'classes'

export enum ActionTypes {
  GET_REGIONS_REQUEST = '@@utils/GET_REGIONS_REQUEST',
  GET_REGIONS_SUCCESS = '@@utils/GET_REGIONS_SUCCESS',
  GET_REGIONS_FAILURE = '@@utils/GET_REGIONS_FAILURE',
  GOOGLE_DIRECTION_REQUEST = '@@utils/GOOGLE_DIRECTION_REQUEST',
  GOOGLE_DIRECTION_SUCCESS = '@@utils/GOOGLE_DIRECTION_SUCCESS',
  GOOGLE_DIRECTION_FAILURE = '@@utils/GOOGLE_DIRECTION_FAILURE',
  GET_UNIT_REQUEST = '@@utils/GET_UNIT_REQUEST',
  GET_UNIT_SUCCESS = '@@utils/GET_UNIT_SUCCESS',
  GET_UNIT_FAILURE = '@@utils/GET_UNIT_FAILURE',
  CLEAR_STATES = '@@utils/CLEAR_STATES',
  GET_TERRITORIES_REQUEST = '@@utils/GET_TERRITORIES_REQUEST',
  GET_TERRITORIES_SUCCESS = '@@utils/GET_TERRITORIES_SUCCESS',
  GET_TERRITORIES_FAILURE = '@@utils/GET_TERRITORIES_FAILURE',
  SEARCH_TEXT = '@@manufacturers/SEARCH_TEXT'
}

export type UtilsState = {
  readonly errors: any
  readonly loading: boolean
  readonly regions: Region[]
  readonly direction: any
  readonly units: Unit[]
  readonly territories: Territory[]
  readonly filtered: Territory[]
  readonly searchText: string
}