import React, { useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import navigation from '@navigation/horizontal'
import classnames from 'classnames'
import { /*isNavLinkActive,*/ search, getAllParents } from '@core/layouts/Utils'

interface NavMenuLinkProps {
  item: any
  setOpenDropdown: (param: any) => void
  setGroupActive: (param: any) => void
  activeItem: any
  setActiveItem: (param: any) => void
  routerProps: any
  currentActiveItem: any
  isChild: boolean
}

const NavMenuLink: React.FC<NavMenuLinkProps> = ({
  item,
  setOpenDropdown,
  setGroupActive,
  activeItem,
  setActiveItem,
  routerProps,
  currentActiveItem,
  isChild
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag: any = item.externalLink ? 'a' : NavLink

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname

  // const navLinkActive = isNavLinkActive(item.navLink, currentURL, routerProps)

  // ** Get parents of current items
  const searchParents = useCallback(
    (navigation: any, currentURL: string) => {
      const parents = search(navigation, currentURL, routerProps) // search for the parent object
      const allParents = getAllParents(parents, 'id') // Parents Object to Parents Array
      allParents.pop()
      return allParents
    },
    [routerProps]
  )

  // ** Remove all items from OpenDropdown array
  const resetOpenDropdowns = () => setOpenDropdown([])

  // ** On mount update active group array
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(navigation, currentURL)
      setGroupActive([...arr])
    }
  }, [
    location,
    currentActiveItem,
    currentURL,
    searchParents,
    setActiveItem,
    setGroupActive
  ])

  return (
    <li
      className={classnames('nav-item', {
        active: item.navLink === activeItem,
        disabled: item.disabled
      })}
      onClick={resetOpenDropdowns}
    >
      <LinkTag
        className={classnames('d-flex align-items-center', {
          'dropdown-item': isChild,
          'nav-link': !isChild
        })}
        tag={LinkTag}
        target={item.newTab ? '_blank' : undefined}
        {...(item.externalLink === true
          ? { href: item.navLink || '/' }
          : {
              to: item.navLink || '/',
              isActive: (match: any, location: any) => {
                if (!match) {
                  return false
                }
                if (
                  match.url &&
                  match.url !== '' &&
                  match.url === item.navLink
                ) {
                  currentActiveItem = item.navLink
                }
              }
            })}
      >
        {item.icon}
        <span>{item.title}</span>
      </LinkTag>
    </li>
  )
}

export default NavMenuLink
