import { action } from 'typesafe-actions'
import { Category } from 'classes'
import { ActionTypes } from './types'

const categoriesActions = {
  addCategoryRequest: (payload: Category) =>
    action(ActionTypes.ADD_CATEGORY_REQUEST, payload),

  addCategorySuccess: (data: Category) =>
    action(ActionTypes.ADD_CATEGORY_SUCCESS, data),

  addCategoryFailure: (error: any) =>
    action(ActionTypes.ADD_CATEGORY_FAILURE, error),

  updateCategoryRequest: (payload: Category) =>
    action(ActionTypes.UPDATE_CATEGORY_REQUEST, payload),

  updateCategorySuccess: (data: Category) =>
    action(ActionTypes.UPDATE_CATEGORY_SUCCESS, data),

  updateCategoryFailure: (error: any) =>
    action(ActionTypes.UPDATE_CATEGORY_FAILURE, error),

  deleteCategoryRequest: (id: number) =>
    action(ActionTypes.DELETE_CATEGORY_REQUEST, id),

  deleteCategorySuccess: (id: number) =>
    action(ActionTypes.DELETE_CATEGORY_SUCCESS, id),

  deleteCategoryFailure: (error: any) =>
    action(ActionTypes.DELETE_CATEGORY_FAILURE, error),

  getCategoriesRequest: () => action(ActionTypes.GET_CATEGORIES_REQUEST),

  getCategoriesSuccess: (data: Category[]) =>
    action(ActionTypes.GET_CATEGORIES_SUCCESS, data),

  getCategoriesFailure: (error: any) =>
    action(ActionTypes.GET_CATEGORIES_FAILURE, error),

  clearStates: () => action(ActionTypes.CLEAR_STATES),

  setSearchText: (value: string) => action(ActionTypes.SEARCH_TEXT, value),

  reorderList: (list: Category[]) => action(ActionTypes.REORDER_LIST, list),

  setSortOrder: (order: 'asc' | 'desc' | 'normal') =>
    action(ActionTypes.SET_SORT_ORDER, order),

  setActiveLink: (link: string) => action(ActionTypes.SET_ACTIVE_LINK, link),

  setCategory: (category: Category) =>
    action(ActionTypes.SET_CATEGORY, category)
}

export default categoriesActions
