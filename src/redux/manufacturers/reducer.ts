import { Manufacturer } from 'classes'
import { Reducer } from 'redux'
import { ManufacturerState, ActionTypes } from './types'

const sortItems = (
  items: Manufacturer[],
  sortOrder: 'asc' | 'desc' | 'normal'
) => {
  switch (sortOrder) {
    case 'normal':
      return items.sort(function (a, b) {
        return b.id - a.id
      })
    case 'asc':
      return items.sort(function (a, b) {
        return a.name.length - b.name.length
      })
    case 'desc':
      return items.sort(function (a, b) {
        return b.name.length - a.name.length
      })
  }
}

export const initialState: ManufacturerState = {
  errors: null,
  isExporting: false,
  isSubmitting: false,
  loading: false,
  manufacturers: [],
  isSucceeded: false,
  searchText: '',
  page: 0,
  totalRecords: 0,
  sortBy: 'normal',
  activeLink: 'list',
  isDeleted: false,
  manufacturer: null
}

const reducer: Reducer<ManufacturerState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MANUFACTURER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.ADD_MANUFACTURER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: [action.payload, ...state.manufacturers],
        isSucceeded: true,
        totalRecords: state.totalRecords + 1
      }

    case ActionTypes.ADD_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_MANUFACTURER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        errors: initialState.errors,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.UPDATE_MANUFACTURER_SUCCESS:
      let manufacturers = state.manufacturers.slice()
      manufacturers = manufacturers.filter((m) => m.id !== action.payload.id)
      manufacturers.unshift(action.payload)
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: manufacturers,
        isSucceeded: true
      }

    case ActionTypes.UPDATE_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isSucceeded: initialState.isSucceeded
      }

    case ActionTypes.DELETE_MANUFACTURER_REQUEST:
      return {
        ...state,
        errors: initialState.errors,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.DELETE_MANUFACTURER_SUCCESS:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        manufacturers: state.manufacturers.filter(
          (m) => m.id !== action.payload
        ),
        isDeleted: true,
        totalRecords: state.totalRecords - 1
      }

    case ActionTypes.DELETE_MANUFACTURER_FAILURE:
      return {
        ...state,
        isSubmitting: initialState.isSubmitting,
        errors: action.payload,
        isDeleted: initialState.isDeleted
      }

    case ActionTypes.GET_MANUFACTURERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        manufacturers: action.payload,
        totalRecords: action.payload.length
      }

    case ActionTypes.GET_MANUFACTURERS_FAILURE:
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
        manufacturers: sortItems(state.manufacturers, action.payload)
      }

    case ActionTypes.REORDER_LIST:
      return {
        ...state,
        manufacturers: action.payload
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

    case ActionTypes.SET_MANUFACTURER:
      return {
        ...state,
        manufacturer: action.payload
      }

    default:
      return state
  }
}

export { reducer as manufacturersReducer }