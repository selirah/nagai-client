import { Reducer } from 'redux'
import { DeliveryState, ActionTypes } from './types'

export const initialState: DeliveryState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  delivery: null,
  deliveries: [],
  params: {
    page: 10,
    skip: 0,
    query: '',
    fromDate: '',
    toDate: ''
  },
  tracking: null,
  loadTracking: false
}

const reducer: Reducer<DeliveryState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DELIVERY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_DELIVERY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_DELIVERY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_DELIVERY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_DELIVERY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_DELIVERY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_DELIVERY_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_DELIVERY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        invoices: state.deliveries.filter((d) => d.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_DELIVERY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_DELIVERIES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_DELIVERIES_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deliveries: action.payload.deliveries,
        count: action.payload.count
      }

    case ActionTypes.GET_DELIVERIES_FAILURE:
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

    case ActionTypes.SET_DELIVERY:
      return {
        ...state,
        delivery: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_TRACKING_REQUEST:
      return {
        ...state,
        loadTracking: true
      }

    case ActionTypes.GET_TRACKING_SUCCESS:
      return {
        ...state,
        loadTracking: initialState.loadTracking,
        tracking: action.payload
      }

    case ActionTypes.GET_TRACKING_FAILURE:
      return {
        ...state,
        loadTracking: initialState.loadTracking,
        error: action.payload
      }

    default:
      return state
  }
}

export { reducer as deliveryReducer }
