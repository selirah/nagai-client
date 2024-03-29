import { Reducer } from 'redux'
import { UtilsState, ActionTypes } from './types'

export const initialState: UtilsState = {
  direction: null,
  errors: null,
  loading: false,
  regions: [],
  units: [],
  territories: [],
  filtered: [],
  searchText: '',
  outlets: [],
  taxes: [],
  users: []
}

const reducer: Reducer<UtilsState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_UNIT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_UNIT_SUCCESS:
      return {
        ...state,
        units: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_UNIT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_REGIONS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_REGIONS_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GOOGLE_DIRECTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.GOOGLE_DIRECTION_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        direction: action.payload
      }
    case ActionTypes.GOOGLE_DIRECTION_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CLEAR_STATES:
      return {
        ...state,
        loading: initialState.loading,
        direction: initialState.direction
      }

    case ActionTypes.GET_TERRITORIES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_TERRITORIES_SUCCESS:
      return {
        ...state,
        territories: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_TERRITORIES_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload.value,
        filtered: action.payload.res
      }

    case ActionTypes.GET_OUTLETS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_OUTLETS_SUCCESS:
      return {
        ...state,
        outlets: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_OUTLETS_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_TAXES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_TAXES_SUCCESS:
      return {
        ...state,
        taxes: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_TAXES_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: initialState.loading
      }

    case ActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: initialState.loading
      }

    default:
      return state
  }
}

export { reducer as utilsReducer }
