import { Invoice, Param } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@invoices/SUBMITTING',
  GET_INVOICES_REQUEST = '@@invoices/GET_INVOICES_REQUEST',
  GET_INVOICES_SUCCESS = '@@invoices/GET_INVOICES_SUCCESS',
  GET_INVOICES_FAILURE = '@@invoices/GET_INVOICES_FAILURE',
  ADD_INVOICE_REQUEST = '@@invoices/ADD_INVOICE_REQUEST',
  ADD_INVOICE_SUCCESS = '@@invoices/ADD_INVOICE_SUCCESS',
  ADD_INVOICE_FAILURE = '@@invoices/ADD_INVOICE_FAILURE',
  UPDATE_INVOICE_REQUEST = '@@invoices/UPDATE_INVOICE_REQUEST',
  UPDATE_INVOICE_SUCCESS = '@@invoices/UPDATE_INVOICE_SUCCESS',
  UPDATE_INVOICE_FAILURE = '@@invoices/UPDATE_INVOICE_FAILURE',
  DELETE_INVOICE_REQUEST = '@@invoices/DELETE_INVOICE_REQUEST',
  DELETE_INVOICE_SUCCESS = '@@invoices/DELETE_INVOICE_SUCCESS',
  DELETE_INVOICE_FAILURE = '@@invoices/DELETE_INVOICE_FAILURE',
  EXPORT_INVOICES_REQUEST = '@@invoices/EXPORT_INVOICES_REQUEST',
  EXPORT_INVOICES_SUCCESS = '@@invoices/EXPORT_INVOICES_SUCCESS',
  EXPORT_INVOICES_FAILURE = '@@invoices/EXPORT_INVOICES_FAILURE',
  CLEAR_STATES = '@@invoices/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@invoices/SET_ACTIVE_LINK',
  SET_INVOICE = '@@invoices/SET_INVOICE',
  SET_QUERY_PARAMS = '@@invoices/SET_QUERY_PARAMS'
}

export type InvoiceState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly invoices: Invoice[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly invoice: Invoice | null
  readonly params: Param
  readonly count: number
}
