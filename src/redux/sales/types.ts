import { Sale, Param } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@SALES/SUBMITTING',
  GET_SALES_REQUEST = '@@sales/GET_SALES_REQUEST',
  GET_SALES_SUCCESS = '@@sales/GET_SALES_SUCCESS',
  GET_SALES_FAILURE = '@@sales/GET_SALES_FAILURE',
  ADD_SALE_REQUEST = '@@sales/ADD_SALE_REQUEST',
  ADD_SALE_SUCCESS = '@@sales/ADD_SALE_SUCCESS',
  ADD_SALE_FAILURE = '@@sales/ADD_SALE_FAILURE',
  UPDATE_SALE_REQUEST = '@@sales/UPDATE_SALE_REQUEST',
  UPDATE_SALE_SUCCESS = '@@sales/UPDATE_SALE_SUCCESS',
  UPDATE_SALE_FAILURE = '@@sales/UPDATE_SALE_FAILURE',
  EXPORT_SALES_REQUEST = '@@sales/EXPORT_SALES_REQUEST',
  EXPORT_SALES_SUCCESS = '@@sales/EXPORT_SALES_SUCCESS',
  EXPORT_SALES_FAILURE = '@@sales/EXPORT_SALES_FAILURE',
  CLEAR_STATES = '@@sales/CLEAR_STATES',
  SET_ACTIVE_LINK = '@@sales/SET_ACTIVE_LINK',
  SET_SALE = '@@sales/SET_SALE',
  SET_QUERY_PARAMS = '@@sales/SET_QUERY_PARAMS'
}

export type SaleState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly sales: Sale[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly activeLink: string
  readonly sale: Sale | null
  readonly params: Param
  readonly count: number
}
