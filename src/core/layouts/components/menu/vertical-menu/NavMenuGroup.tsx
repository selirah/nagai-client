import React, { MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { Collapse, Badge } from 'reactstrap'
import NavMenuItems from './NavMenuItems'
import { isNavGroupActive, getAllParents } from '@core/layouts/Utils'

interface NavMenuGroupProps {
  item: any
  groupActive: any
  setGroupActive: (value: any) => void
  activeItem: any
  setActiveItem: (value: any) => void
  groupOpen: any
  setGroupOpen: (value: any) => void
  parentItem?: any
  menuCollapsed: boolean
  menuHover: boolean
  routerProps: any
  currentActiveItem: any
}

const NavMenuGroup: React.FC<NavMenuGroupProps> = (props) => {
  const {
    activeItem,
    currentActiveItem,
    groupActive,
    groupOpen,
    item,
    menuCollapsed,
    menuHover,
    parentItem,
    routerProps,
    setActiveItem,
    setGroupActive,
    setGroupOpen
  } = props

  const currentURL = useLocation().pathname

  // ** Toggles Open Group
  const toggleOpenGroup = (item: any, parentItem?: any) => {
    let openArr = groupOpen
    let allParents = []

    if (parentItem) {
      allParents = getAllParents(parentItem, 'id')
      allParents.pop()
    }

    // ** If user clicked on menu group inside already opened group i.g. when user click on blog group inside pages group
    if (groupOpen && allParents && groupOpen[0] === allParents[0]) {
      groupOpen.includes(item)
        ? openArr.splice(openArr.indexOf(item), 1)
        : openArr.push(item)
    } else {
      openArr = []
      if (!groupOpen.includes(item)) {
        openArr.push(item)
      }
    }

    setGroupOpen([...openArr])
  }

  // ** Toggle Active Group
  const toggleActiveGroup = (item: any, parentItem?: any) => {
    let activeArr = groupActive
    let allParents = []

    if (parentItem) {
      allParents = getAllParents(parentItem, 'id')
      activeArr = allParents
    } else {
      activeArr.includes(item)
        ? activeArr.splice(activeArr.indexOf(item), 1)
        : activeArr.push(item)
    }

    // ** Set open group removing any activegroup item present in opengroup state
    const openArr = groupOpen.filter((val: any) => !activeArr.includes(val))
    setGroupOpen([...openArr])
    setGroupActive([...activeArr])
  }

  // ** On Group Item Click
  const onCollapseClick = (e: MouseEvent<HTMLAnchorElement>, item: any) => {
    if (
      (groupActive && groupActive.includes(item.id)) ||
      isNavGroupActive(item.children, currentURL, routerProps)
    ) {
      toggleActiveGroup(item.id)
    } else {
      toggleOpenGroup(item.id, parentItem)
    }
    e.preventDefault()
  }

  // ** Returns condition to add open class
  const openClassCondition = (id: any) => {
    if ((menuCollapsed && menuHover) || menuCollapsed === false) {
      if (groupActive.includes(id) || groupOpen.includes(item.id)) {
        return true
      }
    } else if (
      groupActive.includes(id) &&
      menuCollapsed &&
      menuHover === false
    ) {
      return false
    } else {
      return null
    }
  }

  return (
    <li
      className={classnames('nav-item has-sub', {
        open: openClassCondition(item.id),
        'menu-collapsed-open': groupActive.includes(item.id),
        'sidebar-group-active':
          groupActive.includes(item.id) || groupOpen.includes(item.id)
      })}
    >
      <Link
        className="d-flex align-items-center"
        to="/"
        onClick={(e: MouseEvent<HTMLAnchorElement>) => onCollapseClick(e, item)}
      >
        {item.icon}
        <span className="menu-title text-truncate">{item.title}</span>

        {item.badge && item.badgeText ? (
          <Badge className="ml-auto mr-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </Link>
      {/* Render Child Recursively Through NavMenuItems Component */}
      <ul className="menu-content">
        <Collapse
          isOpen={
            (groupActive && groupActive.includes(item.id)) ||
            (groupOpen && groupOpen.includes(item.id))
          }
        >
          <NavMenuItems
            items={item.children}
            groupActive={groupActive}
            setGroupActive={setGroupActive}
            groupOpen={groupOpen}
            setGroupOpen={setGroupOpen}
            toggleActiveGroup={toggleActiveGroup}
            parentItem={item}
            menuCollapsed={menuCollapsed}
            menuHover={menuHover}
            routerProps={routerProps}
            currentActiveItem={currentActiveItem}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </Collapse>
      </ul>
    </li>
  )
}

export default NavMenuGroup
