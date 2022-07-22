import { Reducer } from 'redux'
import { UserState, ActionTypes } from './types'

export const initialState: UserState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  changePassword: false,
  loading: false,
  params: {
    page: 10,
    skip: 0,
    role: '',
    query: ''
  },
  users: [],
  user: null,
  searchedUsers: [],
  company: null
}

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        users: state.users.filter((u) => u.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        users: action.payload.users,
        count: action.payload.count
      }

    case ActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CLEAR_STATES:
      return {
        ...state,
        isSucceeded: initialState.isSucceeded,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted,
        isSubmitting: initialState.isSubmitting,
        loading: initialState.loading,
        changePassword: initialState.changePassword
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_USERS_SEARCH_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_USERS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        searchedUsers: action.payload
      }

    case ActionTypes.GET_USERS_SEARCH_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CLEAR_SEARCHED_USERS:
      return {
        ...state,
        searchedUsers: initialState.searchedUsers
      }

    case ActionTypes.ASSIGN_USER_TERRITORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ASSIGN_USER_TERRITORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ASSIGN_USER_TERRITORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_USER_TERRITORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_USER_TERRITORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_USER_TERRITORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        user: action.payload
      }

    case ActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        changePassword: initialState.isSucceeded
      }

    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        changePassword: true
      }

    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        changePassword: initialState.changePassword
      }

    case ActionTypes.GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        company: action.payload
      }

    case ActionTypes.GET_COMPANY_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.ADD_COMPANY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_COMPANY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_COMPANY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    default:
      return state
  }
}

export { reducer as userReducer }
