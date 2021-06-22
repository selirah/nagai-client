import { Reducer } from 'redux'
import { NavbarState, ActionTypes } from './types'

export const initialState: NavbarState = {
  query: '',
  bookmarks: [],
  suggestions: [],
  error: null
}

const reducer: Reducer<NavbarState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      }
    case ActionTypes.GET_BOOKMARKS_REQUEST:
      return {
        ...state
      }
    case ActionTypes.GET_BOOKMARKS_SUCCESS:
      return {
        ...state,
        suggestions: action.payload.suggestions,
        bookmarks: action.payload.bookmarks
      }
    case ActionTypes.GET_BOOKMARKS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case ActionTypes.UPDATE_BOOKMARKS_REQUEST:
      return {
        ...state
      }
    case ActionTypes.UPDATE_BOOKMARKS_SUCCESS:
      let objectToUpdate
      state.suggestions.find((item) => {
        if (item !== undefined && item.id === action.payload.id) {
          item.isBookmarked = !item.isBookmarked
          objectToUpdate = item
        }
      })
      const bookmarkIndex = state.bookmarks.findIndex(
        (x) => x.id === action.payload.id
      )
      if (
        bookmarkIndex &&
        bookmarkIndex === -1 &&
        objectToUpdate !== undefined
      ) {
        state.bookmarks.push(objectToUpdate)
      } else {
        state.bookmarks.splice(bookmarkIndex, 1)
      }
      return {
        ...state
      }
    case ActionTypes.UPDATE_BOOKMARKS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export { reducer as navbarReducer }
