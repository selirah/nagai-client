import { action } from 'typesafe-actions'
import { UserObj, DBUser, UserFields, Param } from 'classes'
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

  clearSearchedUsers: () => action(ActionTypes.CLEAR_SEARCHED_USERS)
}

export default userActions
