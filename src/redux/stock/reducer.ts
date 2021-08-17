import { Stock } from 'classes'
import moment from 'moment'
import { Reducer } from 'redux'
import { StockState, ActionTypes } from './types'

const sortItems = (items: Stock[], sortOrder: 'asc' | 'desc' | 'normal') => {
  switch (sortOrder) {
    case 'normal':
      return items.sort(function (a, b) {
        const createdAtA: number = parseInt(moment(a.createdAt).format('X'))
        const createdAtB: number = parseInt(moment(b.createdAt).format('X'))
        return createdAtB - createdAtA
      })
    case 'asc':
      return items.sort(function (a, b) {
        const createdAtA: number = parseInt(moment(a.createdAt).format('X'))
        const createdAtB: number = parseInt(moment(b.createdAt).format('X'))
        return createdAtA - createdAtB
      })
    case 'desc':
      return items.sort(function (a, b) {
        const createdAtA: number = parseInt(moment(a.createdAt).format('X'))
        const createdAtB: number = parseInt(moment(b.createdAt).format('X'))
        return createdAtB - createdAtA
      })
  }
}

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
    page: 100,
    skip: 0
  },
  sortBy: 'normal',
  stk: null,
  stock: []
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
        stock: [action.payload, ...state.stock],
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
      let stock = state.stock.slice()
      stock = stock.filter((s) => s.id !== action.payload.id)
      stock.unshift(action.payload)
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        stock: stock,
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

    case ActionTypes.DELETE_STOCK_FAILURE:
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

    case ActionTypes.SET_SORT_ORDER:
      return {
        ...state,
        sortBy: action.payload,
        stock: sortItems(state.stock, action.payload)
      }

    case ActionTypes.REORDER_LIST:
      return {
        ...state,
        stock: action.payload
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

    default:
      return state
  }
}

export { reducer as stockReducer }
