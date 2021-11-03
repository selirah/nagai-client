import { DeliveryStats } from 'classes'
import { Reducer } from 'redux'
import { HomeState, ActionTypes } from './types'

export const initialState: HomeState = {
  activeLink: 'orders',
  errors: null,
  loading: false,
  orders: [],
  deliveries: [],
  sales: [],
  payments: [],
  products: [],
  stock: [],
  invoices: [],
  params: {
    fromDate: '',
    toDate: '',
    page: 10,
    skip: 0
  }
}

const reducer: Reducer<HomeState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ORDER_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_ORDER_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        orders: action.payload
      }

    case ActionTypes.GET_ORDER_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    case ActionTypes.SET_QUERY_PARAMS:
      return {
        ...state,
        params: action.payload
      }

    case ActionTypes.GET_DELIVERY_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_DELIVERY_STAT_SUCCESS:
      let data: DeliveryStats[] = []
      if (action.payload.length) {
        action.payload.map((d: DeliveryStats) => {
          data.push({
            count: parseInt(d.count),
            delivered: d.delivered ? 'DELIVERED' : 'NOT DELIVERED'
          })
          return data
        })
      }
      return {
        ...state,
        loading: initialState.loading,
        deliveries: data
      }

    case ActionTypes.GET_DELIVERY_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.GET_SALE_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_SALE_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        sales: action.payload
      }

    case ActionTypes.GET_SALE_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.GET_PAYMENT_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_PAYMENT_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        payments: action.payload
      }

    case ActionTypes.GET_PAYMENT_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.GET_PRODUCT_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_PRODUCT_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        products: action.payload
      }

    case ActionTypes.GET_PRODUCT_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.GET_STOCK_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_STOCK_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        stock: action.payload
      }

    case ActionTypes.GET_STOCK_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.GET_INVOICE_STAT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_INVOICE_STAT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        invoices: action.payload
      }

    case ActionTypes.GET_INVOICE_STAT_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    default:
      return state
  }
}

export { reducer as homeReducer }
