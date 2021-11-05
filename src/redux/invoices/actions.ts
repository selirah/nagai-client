import { action } from 'typesafe-actions'
import { InvoiceObj, Invoice, Param, InvoiceFields } from '@classes/index'
import { ActionTypes } from './types'

const invoiceActions = {
  addInvoiceRequest: (payload: InvoiceFields) =>
    action(ActionTypes.ADD_INVOICE_REQUEST, payload),

  addInvoiceSuccess: () => action(ActionTypes.ADD_INVOICE_SUCCESS),

  addInvoiceFailure: (error: any) =>
    action(ActionTypes.ADD_INVOICE_FAILURE, error),

  updateInvoiceRequest: (payload: InvoiceFields) =>
    action(ActionTypes.UPDATE_INVOICE_REQUEST, payload),

  updateInvoiceSuccess: () => action(ActionTypes.UPDATE_INVOICE_SUCCESS),

  updateInvoiceFailure: (error: any) =>
    action(ActionTypes.UPDATE_INVOICE_FAILURE, error),

  deleteInvoiceRequest: (id: number) =>
    action(ActionTypes.DELETE_INVOICE_REQUEST, id),

  deleteInvoiceSuccess: (id: number) =>
    action(ActionTypes.DELETE_INVOICE_SUCCESS, id),

  deleteInvoiceFailure: (error: any) =>
    action(ActionTypes.DELETE_INVOICE_FAILURE, error),

  getInvoicesRequest: (params: Param) =>
    action(ActionTypes.GET_INVOICES_REQUEST, params),

  getInvoicesSuccess: (data: InvoiceObj) =>
    action(ActionTypes.GET_INVOICES_SUCCESS, data),

  getInvoicesFailure: (error: any) =>
    action(ActionTypes.GET_INVOICES_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setInvoice: (invoice: Invoice) => action(ActionTypes.SET_INVOICE, invoice),

  setQueryParams: (params: Param) =>
    action(ActionTypes.SET_QUERY_PARAMS, params)
}

export default invoiceActions
