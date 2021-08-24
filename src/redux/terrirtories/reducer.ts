import { Reducer } from 'redux'
import { TerritoryState, ActionTypes } from './types'

export const initialState: TerritoryState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  params: {
    page: 10,
    skip: 0,
    region: 0
  },
  regions: [],
  territories: [],
  territory: null
}

const reducer: Reducer<TerritoryState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TERRITORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_TERRITORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_TERRITORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_TERRITORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_TERRITORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_TERRITORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_TERRITORY_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_TERRITORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        territories: state.territories.filter((t) => t.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_TERRITORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_TERRITORY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_TERRITORY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        territories: action.payload.territories,
        count: action.payload.count
      }

    case ActionTypes.GET_TERRITORY_FAILURE:
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
        loading: initialState.loading
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_TERRITORY:
      return {
        ...state,
        territory: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_REGIONS_REQUEST:
      return {
        ...state
      }

    case ActionTypes.GET_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload
      }

    case ActionTypes.GET_REGIONS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }

    default:
      return state
  }
}

export { reducer as territoryReducer }
