import { Product } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@products/SUBMITTING',
  GET_PRODUCTS_REQUEST = '@@products/GET_PRODUCTS_REQUEST',
  GET_PRODUCTS_SUCCESS = '@@products/GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_FAILURE = '@@products/GET_PRODUCTS_FAILURE',
  ADD_PRODUCT_REQUEST = '@@products/ADD_PRODUCT_REQUEST',
  ADD_PRODUCT_SUCCESS = '@@products/ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAILURE = '@@products/ADD_PRODUCT_FAILURE',
  UPDATE_PRODUCT_REQUEST = '@@products/UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCESS = '@@products/UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILURE = '@@products/UPDATE_PRODUCT_FAILURE',
  DELETE_PRODUCT_REQUEST = '@@products/DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS = '@@products/DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = '@@products/DELETE_PRODUCT_FAILURE',
  EXPORT_PRODUCTS_REQUEST = '@@products/EXPORT_PRODUCTS_REQUEST',
  EXPORT_PRODUCTS_SUCCESS = '@@products/EXPORT_PRODUCTS_SUCCESS',
  EXPORT_PRODUCTS_FAILURE = '@@products/EXPORT_PRODUCTS_FAILURE',
  CLEAR_STATES = '@@products/CLEAR_STATES',
  SEARCH_TEXT = '@@products/SEARCH_TEXT',
  SET_PAGE = '@@products/SET_PAGE',
  REORDER_LIST = '@@products/REORDER_LIST',
  SET_SORT_ORDER = '@@products/SET_SORT_ORDER',
  SET_ACTIVE_LINK = '@@products/SET_ACTIVE_LINK',
  SET_PRODUCT = '@@products/SET_PRODUCT'
}

export type ProductState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly products: Product[]
  readonly loading: boolean
  readonly isExporting: boolean
  readonly isSucceeded: boolean
  readonly searchText: string
  readonly page: number
  readonly totalRecords: number
  readonly sortBy: 'asc' | 'desc' | 'normal'
  readonly activeLink: string
  readonly isDeleted: boolean
  readonly product: Product | null
}
