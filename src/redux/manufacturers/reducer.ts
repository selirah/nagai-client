import { Reducer } from 'redux'
import { ManufacturerState, ActionTypes } from './types'

export const initialState: ManufacturerState = {
  errors: null,
  isExporting: false,
  isSubmitting: false,
  loading: false,
  manufacturers: [],
  isSucceeded: false
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
        isSucceeded: true
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
      manufacturers = manufacturers.filter(
        (m) => m.manufacturerId !== action.payload.manufacturerId
      )
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
          (m) => m.manufacturerId !== action.payload
        ),
        isSucceeded: true
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
        manufacturers: action.payload
      }

    case ActionTypes.GET_MANUFACTURERS_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    default:
      return state
  }
}

export { reducer as manufacturersReducer }
