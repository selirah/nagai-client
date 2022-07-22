import { Reducer } from 'redux'
import { SaleState, ActionTypes } from './types'

export const initialState: SaleState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  sale: null,
  sales: [],
  params: {
    page: 10,
    skip: 0,
    query: '',
    fromDate: '',
    toDate: ''
  }
}

const reducer: Reducer<SaleState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_SALE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_SALE_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_SALE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_SALE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_SALE_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_SALE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.GET_SALES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_SALES_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        sales: action.payload.sales,
        count: action.payload.count
      }

    case ActionTypes.GET_SALES_FAILURE:
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
        isSubmitting: initialState.isSubmitting,
        loading: initialState.loading
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_SALE:
      return {
        ...state,
        sale: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    default:
      return state
  }
}

export { reducer as saleReducer }
