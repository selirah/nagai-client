import { Reducer } from 'redux'
import { StockState, ActionTypes } from './types'

export const initialState: StockState = {
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
    skip: 0
  },
  sortBy: 'normal',
  stk: null,
  stock: [],
  units: []
}

const reducer: Reducer<StockState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_STOCK_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_STOCK_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_STOCK_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_STOCK_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_STOCK_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_STOCK_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_STOCK_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        stock: state.stock.filter((s) => s.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_STOCK_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_STOCK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_STOCK_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        stock: action.payload.stock,
        count: action.payload.count
      }

    case ActionTypes.GET_STOCK_FAILURE:
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
        sortBy: initialState.sortBy,
        isDeleted: initialState.isDeleted,
        isSubmitting: initialState.isSubmitting,
        loading: initialState.loading
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_STOCK:
      return {
        ...state,
        stk: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_UNIT_REQUEST:
      return {
        ...state
      }

    case ActionTypes.GET_UNIT_SUCCESS:
      return {
        ...state,
        units: action.payload
      }

    case ActionTypes.GET_UNIT_FAILURE:
      return {
        ...state,
        units: action.payload
      }

    default:
      return state
  }
}

export { reducer as stockReducer }
