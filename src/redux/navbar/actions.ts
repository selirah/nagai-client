import { Bookmark } from '@classes/index'
import { action } from 'typesafe-actions'
import { ActionTypes } from './types'

const navbarActions = {
  handleSearchQuery: (value: string) =>
    action(ActionTypes.HANDLE_SEARCH_QUERY, value),
  getBookmarksRequest: () => action(ActionTypes.GET_BOOKMARKS_REQUEST),
  getBookmarksSuccess: (data: Bookmark[]) =>
    action(ActionTypes.GET_BOOKMARKS_SUCCESS, data),
  getBookmarksFailure: (error: any) =>
    action(ActionTypes.GET_BOOKMARKS_FAILURE, error),
  updateBookmarkRequest: (bookmarkId: number) =>
    action(ActionTypes.UPDATE_BOOKMARKS_REQUEST, bookmarkId),
  updateBookmarkSuccess: (data: any) =>
    action(ActionTypes.UPDATE_BOOKMARKS_SUCCESS, data),
  updateBookmarkFailure: (error: any) =>
    action(ActionTypes.UPDATE_BOOKMARKS_FAILURE, error)
}

export default navbarActions
