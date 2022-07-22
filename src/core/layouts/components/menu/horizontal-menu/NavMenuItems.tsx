import React from 'react'
import NavMenuLink from './NavMenuLink'
import NavMenuGroup from './NavMenuGroup'
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/Utils'

interface NavMenuItemsProps {
  submenu: boolean
  parentItem?: any
  items: any
  activeItem: any
  groupActive: any
  routerProps: any
  openDropdown: any
  onMouseEnter: (itemId: any) => void
  onMouseLeave: (itemId: any) => void
  setActiveItem: (value: any) => void
  setGroupActive: (value: any) => void
  isChild?: boolean
  setOpenDropdown: (value: any) => void
  currentActiveItem: any
}

const NavMenuItems: React.FC<NavMenuItemsProps> = (props) => {
  const { items } = props

  const Components: any = { NavMenuGroup, NavMenuLink }

  const RenderNavItems = items.map((item: any, index: any) => {
    const TagName = Components[resolveNavItemComponent(item)]

    return <TagName item={item} index={index} key={item.id} {...props} />
  })

  return RenderNavItems
}

export default NavMenuItems
