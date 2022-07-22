export enum ActionTypes {
  HANDLE_CONTENT_WIDTH = '@@layout/HANDLE_CONTENT_WIDTH',
  HANDLE_MENU_COLLAPSED = '@@layout/HANDLE_MENU_COLLAPSED',
  HANDLE_MENU_HIDDEN = '@@layout/HANDLE_MENU_HIDDEN',
  HANDLE_RTL = '@@layout/HANDLE_RTL',
  HANDLE_LAYOUT_MODE = '@@layout/HANDLE_LAYOUT_MODE'
}

export type LayoutState = {
  readonly isRTL: boolean
  readonly menuCollapsed: any
  readonly menuHidden: boolean
  readonly contentWidth: string
  readonly mode: string
}
