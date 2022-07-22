import { Reducer } from 'redux'
import { OutletState, ActionTypes } from './types'

export const initialState: OutletState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  outlet: null,
  outlets: [],
  params: {
    page: 10,
    skip: 0,
    territory: 0,
    query: ''
  },
  orders: [],
  orderCount: 0,
  loadOrders: false,
  orderParams: {
    page: 10,
    skip: 0,
    fromDate: '',
    toDate: ''
  }
}

const reducer: Reducer<OutletState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_OUTLETS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_OUTLETS_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_OUTLETS_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_OUTLETS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_OUTLETS_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_OUTLETS_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_OUTLETS_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_OUTLETS_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        outlets: state.outlets.filter((o) => o.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_OUTLETS_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_OUTLETS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_OUTLETS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        outlets: action.payload.outlets,
        count: action.payload.count
      }

    case ActionTypes.GET_OUTLETS_FAILURE:
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

    case ActionTypes.SET_OUTLET:
      return {
        ...state,
        outlet: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_ORDER_REQUEST:
      return {
        ...state,
        loadOrders: true
      }

    case ActionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        loadOrders: initialState.loadOrders,
        orders: action.payload.orders,
        orderCount: action.payload.count
      }

    case ActionTypes.GET_ORDER_FAILURE:
      return {
        ...state,
        loadOrders: initialState.loadOrders,
        error: action.payload
      }

    case ActionTypes.SET_ORDER_PARAMS:
      return {
        ...state,
        orderParams: action.payload
      }

    default:
      return state
  }
}

export { reducer as outletReducer }
