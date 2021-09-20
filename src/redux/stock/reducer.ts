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
    skip: 0,
    fromDate: '',
    toDate: ''
  },
  stk: null,
  stock: [],
  stockTrails: [],
  stockTrailsCount: 0,
  stockTrailsParams: {
    page: 10,
    skip: 0,
    fromDate: '',
    toDate: ''
  },
  loadStockTrails: false
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
        isDeleted: initialState.isDeleted,
        isSubmitting: initialState.isSubmitting,
        loading: initialState.loading,
        loadStockTrails: initialState.loadStockTrails
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

    case ActionTypes.GET_STOCK_TRAILS_REQUEST:
      return {
        ...state,
        loadStockTrails: true
      }

    case ActionTypes.GET_STOCK_TRAILS_SUCCESS:
      return {
        ...state,
        loadStockTrails: initialState.loadStockTrails,
        stockTrails: action.payload.stockTrails,
        stockTrailsCount: action.payload.count
      }

    case ActionTypes.GET_STOCK_TRAILS_FAILURE:
      return {
        ...state,
        loadStockTrails: initialState.loadStockTrails,
        error: action.payload
      }

    case ActionTypes.SET_STOCK_TRIALS_PARAMS:
      return {
        ...state,
        stockTrailsParams: action.payload
      }

    default:
      return state
  }
}

export { reducer as stockReducer }
