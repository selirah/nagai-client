import { Reducer } from 'redux'
import { InvoiceState, ActionTypes } from './types'

export const initialState: InvoiceState = {
  activeLink: 'list',
  count: 0,
  errors: null,
  isDeleted: false,
  isExporting: false,
  isSubmitting: false,
  isSucceeded: false,
  loading: false,
  invoice: null,
  invoices: [],
  params: {
    page: 10,
    skip: 0,
    query: '',
    fromDate: '',
    toDate: ''
  }
}

const reducer: Reducer<InvoiceState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INVOICE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_INVOICE_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.ADD_INVOICE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_INVOICE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_INVOICE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_INVOICE_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        invoices: state.invoices.filter((i) => i.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_INVOICE_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_INVOICES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        invoices: action.payload.invoices,
        count: action.payload.count
      }

    case ActionTypes.GET_INVOICES_FAILURE:
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

    case ActionTypes.SET_INVOICE:
      return {
        ...state,
        invoice: action.payload
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

export { reducer as invoiceReducer }
