import { Reducer } from 'redux'
import { ProductState, ActionTypes } from './types'

export const initialState: ProductState = {
  errors: null,
  isExporting: false,
  isSubmitting: false,
  loading: false,
  products: [],
  isSucceeded: false,
  activeLink: 'list',
  isDeleted: false,
  product: null,
  params: {
    category: 0,
    manufacturer: 0,
    page: 10,
    skip: 0,
    query: ''
  },
  count: 0,
  stockTrails: [],
  stockTrailsCount: 0,
  stockTrailsParams: {
    page: 10,
    skip: 0,
    fromDate: '',
    toDate: ''
  },
  loadStockTrails: false,
  searchedProducts: []
}

const reducer: Reducer<ProductState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        products: state.products.filter((p) => p.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        products: action.payload.products,
        count: action.payload.count
      }

    case ActionTypes.GET_PRODUCTS_FAILURE:
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
        loadStockTrails: initialState.loadStockTrails,
        loading: initialState.loading
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload
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
        loadStockTrails: initialState.loading,
        error: action.payload
      }

    case ActionTypes.SET_STOCK_TRIALS_PARAMS:
      return {
        ...state,
        stockTrailsParams: action.payload
      }

    case ActionTypes.GET_PRODUCTS_SEARCH_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_PRODUCTS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        searchedProducts: action.payload
      }

    case ActionTypes.GET_PRODUCTS_SEARCH_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.CLEAR_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: initialState.searchedProducts
      }

    default:
      return state
  }
}

export { reducer as productsReducer }
