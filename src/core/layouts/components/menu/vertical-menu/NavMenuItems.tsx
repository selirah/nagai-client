import React from 'react'
import NavMenuLink from './NavMenuLink'
import NavMenuGroup from './NavMenuGroup'
import NavMenuSectionHeader from './NavMenuSectionHeader'
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '../../../Utils'

interface NavMenuItemsProps {
  parentItem?: any
  items: any
  activeItem: any
  groupActive: any
  routerProps: any
  setActiveItem: (value: any) => void
  setGroupActive: (value: any) => void
  currentActiveItem: any
  groupOpen: any
  setGroupOpen: (value: any) => void
  toggleActiveGroup?: (item: any, parentItem?: any) => void
  menuCollapsed: boolean
  menuHover: boolean
}

const NavMenuItems: React.FC<NavMenuItemsProps> = (props) => {
  const { items } = props

  const Components: any = { NavMenuSectionHeader, NavMenuGroup, NavMenuLink }

  const RenderNavItems = items.map((item: any, index: number) => {
    const TagName = Components[resolveNavItemComponent(item)]

    return (
      <TagName
        item={item}
        index={index}
        key={item.id || item.header}
        {...props}
      />
    )
  })

  return RenderNavItems
}

export default NavMenuItems
