import { action } from 'typesafe-actions'
import { ActionTypes } from './types'

const layoutActions = {
  handleContentWidth: (value: string) =>
    action(ActionTypes.HANDLE_CONTENT_WIDTH, value),
  handleMenuCollapsed: (value: boolean) =>
    action(ActionTypes.HANDLE_MENU_COLLAPSED, value),
  handleMenuHidden: (value: boolean) =>
    action(ActionTypes.HANDLE_MENU_HIDDEN, value),
  handleRTL: (value: boolean) => action(ActionTypes.HANDLE_RTL, value),
  handleLayoutMode: (value: string) =>
    action(ActionTypes.HANDLE_LAYOUT_MODE, value),
  handleSearchQuery: (value: string) =>
    action(ActionTypes.HANDLE_SEARCH_QUERY, value)
}

export default layoutActions
