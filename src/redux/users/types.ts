import { DBUser, Param } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@users/SUBMITTING',
  GET_USERS_REQUEST = '@@users/GET_USERS_REQUEST',
  GET_USERS_SUCCESS = '@@users/GET_USERS_SUCCESS',
  GET_USERS_FAILURE = '@@users/GET_USERS_FAILURE',
  ADD_USER_REQUEST = '@@users/ADD_TERRITORY_REQUEST',
  ADD_USER_SUCCESS = '@@users/ADD_TERRITORY_SUCCESS',
  ADD_USER_FAILURE = '@@users/ADD_TERRITORY_FAILURE',
  UPDATE_USER_REQUEST = '@@users/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@@users/UPDATE_USER_FAILURE',
  DELETE_USER_REQUEST = '@@users/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@@users/DELETE_USER_FAILURE',
  EXPORT_USERS_REQUEST = '@@users/EXPORT_USERS_REQUEST',
  EXPORT_USERS_SUCCESS = '@@users/EXPORT_USERS_SUCCESS',
  EXPORT_USERS_FAILURE = '@@users/EXPORT_USERS_FAILURE',
  CLEAR_STATES = '@@users/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@users/SET_ACTIVE_LINK',
  SET_USER = '@@users/SET_USER',
  SET_QUERY_PARAMS = '@@users/SET_QUERY_PARAMS',
  GET_USERS_SEARCH_REQUEST = '@@users/GET_USERS_SEARCH_REQUEST',
  GET_USERS_SEARCH_SUCCESS = '@@users/GET_USERS_SEARCH_SUCCESS',
  GET_USERS_SEARCH_FAILURE = '@@users/GET_USERS_SEARCH_FAILURE',
  CLEAR_SEARCHED_USERS = '@@users/CLEAR_SEARCHED_USERS'
}

export type UserState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly users: DBUser[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly user: DBUser | null
  readonly params: Param
  readonly count: number
  readonly searchedUsers: DBUser[]
}
