import { Category } from 'classes'
import { Reducer } from 'redux'
import { CategoryState, ActionTypes } from './types'

const sortItems = (items: Category[], sortOrder: 'asc' | 'desc' | 'normal') => {
  switch (sortOrder) {
    case 'normal':
      return items.sort(function (a, b) {
        return b.id - a.id
      })
    case 'asc':
      return items.sort(function (a, b) {
        return a.category.length - b.category.length
      })
    case 'desc':
      return items.sort(function (a, b) {
        return b.category.length - a.category.length
      })
  }
}

export const initialState: CategoryState = {
  errors: null,
  isSubmitting: false,
  loading: false,
  categories: [],
  isSucceeded: false,
  searchText: '',
  sortBy: 'normal',
  activeLink: 'list',
  isDeleted: false
}

const reducer: Reducer<CategoryState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        categories: [action.payload, ...state.categories],
        isSucceeded: true
      }

    case ActionTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_CATEGORY_SUCCESS:
      let categories = state.categories.slice()
      categories = categories.filter((c) => c.id !== action.payload.id)
      categories.unshift(action.payload)
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        categories: categories,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        categories: state.categories.filter((c) => c.id !== action.payload),
        isDeleted: true
      }

    case ActionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        categories: action.payload
      }

    case ActionTypes.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        error: action.payload
      }

    case ActionTypes.SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }

    case ActionTypes.SET_SORT_ORDER:
      return {
        ...state,
        sortBy: action.payload,
        categories: sortItems(state.categories, action.payload)
      }

    case ActionTypes.REORDER_LIST:
      return {
        ...state,
        categories: action.payload
      }

    case ActionTypes.CLEAR_STATES:
      return {
        ...state,
        searchText: initialState.searchText,
        isSucceeded: initialState.isSucceeded,
        errors: initialState.errors,
        sortBy: initialState.sortBy,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.SET_ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }

    default:
      return state
  }
}

export { reducer as categoriesReducer }
