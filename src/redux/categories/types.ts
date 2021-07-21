import { Category } from 'classes'

export enum ActionTypes {
  SUBMITTING = '@@auth/SUBMITTING',
  GET_CATEGORIES_REQUEST = '@@categories/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = '@@categories/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = '@@categories/GET_CATEGORIES_FAILURE',
  ADD_CATEGORY_REQUEST = '@@categories/ADD_CATEGORY_REQUEST',
  ADD_CATEGORY_SUCCESS = '@@categories/ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILURE = '@@categories/ADD_CATEGORY_FAILURE',
  UPDATE_CATEGORY_REQUEST = '@@categories/UPDATE_CATEGORY_REQUEST',
  UPDATE_CATEGORY_SUCCESS = '@@categories/UPDATE_CATEGORY_SUCCESS',
  UPDATE_CATEGORY_FAILURE = '@@categories/UPDATE_CATEGORY_FAILURE',
  DELETE_CATEGORY_REQUEST = '@@categories/DELETE_CATEGORY_REQUEST',
  DELETE_CATEGORY_SUCCESS = '@@categories/DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_FAILURE = '@@categories/DELETE_CATEGORY_FAILURE',
  CLEAR_STATES = '@@categories/CLEAR_STATES',
  SEARCH_TEXT = '@@categories/SEARCH_TEXT',
  REORDER_LIST = '@@categories/REORDER_LIST',
  SET_SORT_ORDER = '@@categories/SET_SORT_ORDER',
  SET_ACTIVE_LINK = '@@categories/SET_ACTIVE_LINK'
}

export type CategoryState = {
  readonly isSubmitting: boolean
  readonly errors: any
  readonly categories: Category[]
  readonly loading: boolean
  readonly isSucceeded: boolean
  readonly searchText: string
  readonly sortBy: 'asc' | 'desc' | 'normal'
  readonly activeLink: string
  readonly isDeleted: boolean
}
