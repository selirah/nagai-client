import { Bookmark } from 'classes'

export enum ActionTypes {
  HANDLE_SEARCH_QUERY = '@@navbar/HANDLE_SEARCH_QUERY',
  GET_BOOKMARKS_REQUEST = '@@navbar/GET_BOOKMARKS_REQUEST',
  GET_BOOKMARKS_SUCCESS = '@@navbar/GET_BOOKMARKS_SUCCESS',
  GET_BOOKMARKS_FAILURE = '@@navbar/GET_BOOKMARKS_FAILURE',
  UPDATE_BOOKMARKS_REQUEST = '@@navbar/UPDATE_BOOKMARKS_REQUEST',
  UPDATE_BOOKMARKS_SUCCESS = '@@navbar/UPDATE_BOOKMARKS_SUCCESS',
  UPDATE_BOOKMARKS_FAILURE = '@@navbar/UPDATE_BOOKMARKS_FAILURE'
}

export type NavbarState = {
  readonly query: string
  readonly suggestions: Bookmark[]
  readonly bookmarks: Bookmark[]
  readonly error: any
}
