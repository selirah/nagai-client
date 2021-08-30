import { Territory, Param } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@territories/SUBMITTING',
  GET_TERRITORY_REQUEST = '@@territories/GET_TERRITORY_REQUEST',
  GET_TERRITORY_SUCCESS = '@@territories/GET_TERRITORY_SUCCESS',
  GET_TERRITORY_FAILURE = '@@territories/GET_TERRITORY_FAILURE',
  ADD_TERRITORY_REQUEST = '@@territories/ADD_TERRITORY_REQUEST',
  ADD_TERRITORY_SUCCESS = '@@territories/ADD_TERRITORY_SUCCESS',
  ADD_TERRITORY_FAILURE = '@@territories/ADD_TERRITORY_FAILURE',
  UPDATE_TERRITORY_REQUEST = '@@territories/UPDATE_TERRITORY_REQUEST',
  UPDATE_TERRITORY_SUCCESS = '@@territories/UPDATE_TERRITORY_SUCCESS',
  UPDATE_TERRITORY_FAILURE = '@@territories/UPDATE_TERRITORY_FAILURE',
  DELETE_TERRITORY_REQUEST = '@@territories/DELETE_TERRITORY_REQUEST',
  DELETE_TERRITORY_SUCCESS = '@@territories/DELETE_TERRITORY_SUCCESS',
  DELETE_TERRITORY_FAILURE = '@@territories/DELETE_TERRITORY_FAILURE',
  EXPORT_TERRITORY_REQUEST = '@@territories/EXPORT_TERRITORY_REQUEST',
  EXPORT_TERRITORY_SUCCESS = '@@territories/EXPORT_TERRITORY_SUCCESS',
  EXPORT_TERRITORY_FAILURE = '@@territories/EXPORT_TERRITORY_FAILURE',
  CLEAR_STATES = '@@territories/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@territories/SET_ACTIVE_LINK',
  SET_TERRITORY = '@@territories/SET_TERRITORY',
  SET_QUERY_PARAMS = '@@territories/SET_QUERY_PARAMS'
}

export type TerritoryState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly territories: Territory[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly territory: Territory | null
  readonly params: Param
  readonly count: number
}
