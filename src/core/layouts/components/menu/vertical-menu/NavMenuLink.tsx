import React, { ChangeEvent, useEffect } from 'react'
import { NavLink, useLocation, matchPath } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import Navigation from 'navigation/vertical'
import { search, getAllParents } from 'core/layouts/Utils'

interface NavMenuLinkProps {
  item: any
  groupActive: any
  setGroupActive: (param: any) => void
  activeItem: any
  setActiveItem: (param: any) => void
  groupOpen: any
  setGroupOpen: (param: any) => void
  toggleActiveGroup: (id: any, parents: any) => void
  parentItem: any
  routerProps: any
  currentActiveItem: any
}

const NavMenuLink: React.FC<NavMenuLinkProps> = ({
  activeItem,
  currentActiveItem,
  groupActive,
  groupOpen,
  item,
  parentItem,
  routerProps,
  setActiveItem,
  setGroupActive,
  setGroupOpen,
  toggleActiveGroup
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag: any = item.externalLink ? 'a' : NavLink

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname

  // ** To match path
  const match = matchPath(currentURL, {
    path: `${item.navLink}/:param`,
    exact: true,
    strict: false
  })

  // ** Search for current item parents
  const searchParents = (navigation: any, currentURL: any) => {
    const parents = search(navigation, currentURL, routerProps) // search for the parent object
    const allParents = getAllParents(parents, 'id')
    return allParents
  }

  // ** URL Vars
  const resetActiveGroup = (navLink: any) => {
    const parents = search(navigator, navLink, match)
    toggleActiveGroup(item.id, parents)
  }

  // ** Reset Active & Open Group Arrays
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }

  // ** Checks url & updates active item
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(Navigation, currentURL)
      setGroupActive([...arr])
    }
  }, [location])

  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? '_blank' : undefined}
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
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
        onClick={(e: ChangeEvent<HTMLInputElement>) => {
          if (!item.navLink.length) {
            e.preventDefault()
          }
          parentItem
            ? resetActiveGroup(item.navLink)
            : resetActiveAndOpenGroups()
        }}
      >
        {item.icon}
        <span className="menu-item text-truncate">
          <FormattedMessage id={item.title} />
        </span>

        {item.badge && item.badgeText ? (
          <Badge className="ml-auto mr-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default NavMenuLink
