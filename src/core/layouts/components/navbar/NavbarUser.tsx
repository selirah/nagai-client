import React, { Fragment, useCallback } from 'react'
import { Sun, Moon, Menu } from 'react-feather'
import { NavItem, NavLink, UncontrolledTooltip } from 'reactstrap'
import IntlDropdown from './IntlDropdown'
import UserDropdown from './UserDropdown'
import CartDisplay from './Cart'

interface NavbarUserProps {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  setMenuVisibility: (value: boolean) => void
}

const NavbarUser: React.FC<NavbarUserProps> = (props) => {
  const { mode, setMenuVisibility, setMode } = props

  const ThemeToggler = useCallback(() => {
    if (mode === 'dark') {
      return (
        <Fragment>
          <UncontrolledTooltip placement="top" target="#lightMode">
            Light Mode
          </UncontrolledTooltip>
          <Sun
            className="ficon"
            onClick={() => setMode('light')}
            id="lightMode"
          />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <UncontrolledTooltip placement="top" target="#darkMode">
            Dark Mode
          </UncontrolledTooltip>
          <Moon
            className="ficon"
            onClick={() => setMode('dark')}
            id="darkMode"
          />
        </Fragment>
      )
    }
  }, [mode, setMode])

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none d-flex align-items-center">
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <CartDisplay />
        <IntlDropdown />
        <UserDropdown />
        <NavItem className="d-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarUser
