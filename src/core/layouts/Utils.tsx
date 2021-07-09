import { useContext } from 'react'
import { AbilityContext } from 'contexts/Can'

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveVerticalNavMenuItemComponent = (item: any) => {
  if (item.header) return 'NavMenuSectionHeader'
  if (item.children) return 'NavMenuGroup'
  return 'NavMenuLink'
}

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveHorizontalNavMenuItemComponent = (item: any) => {
  if (item.children) return 'NavMenuGroup'
  return 'NavMenuLink'
}

export const isNavLinkActive = (
  link: string,
  currentURL: string,
  routerProps: any
) => {
  return (
    currentURL === link ||
    (routerProps &&
      routerProps.meta &&
      routerProps.meta.navLink &&
      routerProps.meta.navLink === link)
  )
  // return currentURL === link
}

export const isNavGroupActive = (
  children: any,
  currentURL: string,
  routerProps: any
) => {
  return children.some((child: any) => {
    // If child have children => It's group => Go deeper(recursive)
    if (child.children) {
      return isNavGroupActive(child.children, currentURL, routerProps)
    }
    // else it's link => Check for matched Route
    return isNavLinkActive(child.navLink, currentURL, routerProps)
  })
}

export const search = (
  navigation: any,
  currentURL: string,
  routerProps: any
) => {
  let result: any
  navigation.some((child: any) => {
    let children
    // If child have children => It's group => Go deeper(recursive)
    if (
      child.children &&
      (children = search(child.children, currentURL, routerProps))
    ) {
      return (result = {
        id: child.id,
        children
      })
    }

    // else it's link => Check for matched Route
    if (isNavLinkActive(child.navLink, currentURL, routerProps)) {
      return (result = {
        id: child.id
      })
    }
    return result
  })
  return result
}

/**
 * Loop through nested object
 * @param {object} obj nested object
 */
export const getAllParents = (obj: any, match: any) => {
  const res: any = []
  const recurse = (obj: any, current?: any) => {
    for (const key in obj) {
      const value = obj[key]
      if (value !== undefined) {
        if (value && typeof value === 'object') {
          recurse(value, key)
        } else {
          if (key === match) {
            res.push(value)
          }
        }
      }
    }
  }
  recurse(obj)
  return res
}

export const CanViewMenuGroup = (item: any) => {
  const ability = useContext(AbilityContext)
  // ! This same logic is used in canViewHorizontalNavMenuGroup and canViewHorizontalNavMenuHeaderGroup. So make sure to update logic in them as well
  const hasAnyVisibleChild =
    item.children &&
    item.children.some((i: any) => ability.can(i.action, i.resource))

  // ** If resource and action is defined in item => Return based on children visibility (Hide group if no child is visible)
  // ** Else check for ability using provided resource and action along with checking if has any visible child
  if (!(item.action && item.resource)) {
    return hasAnyVisibleChild
  }
  return ability.can(item.action, item.resource) && hasAnyVisibleChild
}

export const CanViewMenuItem = (item: any) => {
  const ability = useContext(AbilityContext)
  return ability.can(item.action, item.resource)
}
