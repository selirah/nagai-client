import { Reducer } from 'redux'
import { LayoutState, ActionTypes } from './types'
import themeConfig from 'theme/themeConfig'

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

export const initialState: LayoutState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth,
  mode: themeConfig.layout.mode,
  query: ''
}

const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_CONTENT_WIDTH:
      return {
        ...state,
        contentWidth: action.payload
      }
    case ActionTypes.HANDLE_MENU_COLLAPSED:
      window.localStorage.setItem(
        'menuCollapsed',
        JSON.stringify(action.payload)
      )
      return {
        ...state,
        menuCollapsed: action.payload
      }
    case ActionTypes.HANDLE_MENU_HIDDEN:
      return {
        ...state,
        menuHidden: action.payload
      }
    case ActionTypes.HANDLE_RTL:
      return {
        ...state,
        isRTL: action.payload
      }
    case ActionTypes.HANDLE_LAYOUT_MODE:
      return {
        ...state,
        mode: action.payload
      }
    case ActionTypes.HANDLE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      }
    default:
      return state
  }
}

export { reducer as layoutReducer }
