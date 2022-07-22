import { action } from 'typesafe-actions'
import {
  UserObj,
  DBUser,
  UserFields,
  Param,
  UserTerritoryFields,
  ChangePassword,
  Company
} from '@classes/index'
import { ActionTypes } from './types'

const userActions = {
  addUserRequest: (payload: UserFields) =>
    action(ActionTypes.ADD_USER_REQUEST, payload),

  addUserSuccess: () => action(ActionTypes.ADD_USER_SUCCESS),

  addUserFailure: (error: any) => action(ActionTypes.ADD_USER_FAILURE, error),

  updateUserRequest: (payload: UserFields) =>
    action(ActionTypes.UPDATE_USER_REQUEST, payload),

  updateUserSuccess: () => action(ActionTypes.UPDATE_USER_SUCCESS),

  updateUserFailure: (error: any) =>
    action(ActionTypes.UPDATE_USER_FAILURE, error),

  deleteUserRequest: (id: number) =>
    action(ActionTypes.DELETE_USER_REQUEST, id),

  deleteUserSuccess: (id: number) =>
    action(ActionTypes.DELETE_USER_SUCCESS, id),

  deleteUserFailure: (error: any) =>
    action(ActionTypes.DELETE_USER_FAILURE, error),

  getUsersRequest: (params: Param) =>
    action(ActionTypes.GET_USERS_REQUEST, params),

  getUsersSuccess: (data: UserObj) =>
    action(ActionTypes.GET_USERS_SUCCESS, data),

  getUsersFailure: (error: any) => action(ActionTypes.GET_USERS_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setUser: (user: DBUser) => action(ActionTypes.SET_USER, user),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params),

  getSearchedUsersRequest: (query: string) =>
    action(ActionTypes.GET_USERS_SEARCH_REQUEST, query),

  getSearchedUsersSuccess: (data: DBUser[]) =>
    action(ActionTypes.GET_USERS_SEARCH_SUCCESS, data),

  getSearchedUsersFailure: (error: any) =>
    action(ActionTypes.GET_USERS_SEARCH_FAILURE, error),

  clearSearchedUsers: () => action(ActionTypes.CLEAR_SEARCHED_USERS),

  assignUserTerritoryRequest: (payload: UserTerritoryFields) =>
    action(ActionTypes.ASSIGN_USER_TERRITORY_REQUEST, payload),

  assignUserTerritorySuccess: () =>
    action(ActionTypes.ASSIGN_USER_TERRITORY_SUCCESS),

  assignUserTerritoryFailure: (error: any) =>
    action(ActionTypes.ASSIGN_USER_TERRITORY_FAILURE, error),

  updateUserTerritoryRequest: (payload: UserTerritoryFields) =>
    action(ActionTypes.UPDATE_USER_TERRITORY_REQUEST, payload),

  updateUserTerritorySuccess: () =>
    action(ActionTypes.UPDATE_USER_TERRITORY_SUCCESS),

  updateUserTerritoryFailure: (error: any) =>
    action(ActionTypes.UPDATE_USER_TERRITORY_FAILURE, error),

  getUserRequest: (payload: number) =>
    action(ActionTypes.GET_USER_REQUEST, payload),

  getUserSuccess: (user: DBUser) => action(ActionTypes.GET_USER_SUCCESS, user),

  getUserFailure: (error: any) => action(ActionTypes.GET_USER_FAILURE, error),

  changePasswordRequest: (payload: ChangePassword) =>
    action(ActionTypes.CHANGE_PASSWORD_REQUEST, payload),

  changePasswordSuccess: () => action(ActionTypes.CHANGE_PASSWORD_SUCCESS),

  changePasswordFailure: (error: any) =>
    action(ActionTypes.CHANGE_PASSWORD_FAILURE, error),

  addCompanyRequest: (payload: Company) =>
    action(ActionTypes.ADD_COMPANY_REQUEST, payload),

  addCompanySuccess: () => action(ActionTypes.ADD_COMPANY_SUCCESS),

  addCompanyFailure: (error: any) =>
    action(ActionTypes.ADD_COMPANY_FAILURE, error),

  updateCompanyRequest: (payload: Company) =>
    action(ActionTypes.UPDATE_COMPANY_REQUEST, payload),

  updateCompanySuccess: () => action(ActionTypes.UPDATE_COMPANY_SUCCESS),

  updateCompanyFailure: (error: any) =>
    action(ActionTypes.UPDATE_COMPANY_FAILURE, error),

  getCompanyRequest: () => action(ActionTypes.GET_COMPANY_REQUEST),

  getCompanySuccess: (user: Company) =>
    action(ActionTypes.GET_COMPANY_SUCCESS, user),

  getCompanyFailure: (error: any) =>
    action(ActionTypes.GET_COMPANY_FAILURE, error)
}

export default userActions
