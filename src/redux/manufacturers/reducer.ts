import { Reducer } from 'redux'
import { ManufacturerState, ActionTypes } from './types'

export const initialState: ManufacturerState = {
  errors: null,
  isExporting: false,
  isSubmitting: false,
  loading: false,
  manufacturers: [],
  isSucceeded: false,
  searchText: '',
  page: 0,
  totalRecords: 0
}

const reducer: Reducer<ManufacturerState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MANUFACTURER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_MANUFACTURER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: [action.payload, ...state.manufacturers],
        isSucceeded: true,
        totalRecords: state.totalRecords + 1
      }

    case ActionTypes.ADD_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_MANUFACTURER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_MANUFACTURER_SUCCESS:
      let manufacturers = state.manufacturers.slice()
      manufacturers = manufacturers.filter((m) => m.id !== action.payload.id)
      manufacturers.unshift(action.payload)
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: manufacturers,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_MANUFACTURER_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: state.manufacturers.filter(
          (m) => m.id !== action.payload
        ),
        isSucceeded: true,
        totalRecords: state.totalRecords - 1
      }

    case ActionTypes.DELETE_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.GET_MANUFACTURERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        manufacturers: action.payload,
        totalRecords: action.payload.length
      }

    case ActionTypes.GET_MANUFACTURERS_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }

    case ActionTypes.REORDER_LIST:
      return {
        ...state,
        manufacturers: action.payload
      }

    default:
      return state
  }
}

export { reducer as manufacturersReducer }
