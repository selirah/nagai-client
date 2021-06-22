import React, { Fragment, useCallback } from 'react'
import { Sun, Moon, Menu, Wifi } from 'react-feather'
import {
  NavItem,
  NavLink,
  UncontrolledTooltip,
  Badge,
  Collapse
} from 'reactstrap'
import IntlDropdown from './IntlDropdown'
import UserDropdown from './UserDropdown'

interface NavbarUserProps {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  setMenuVisibility?: (value: boolean) => void
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
  }, [])

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none d-flex align-items-center">
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => (setMenuVisibility ? setMenuVisibility(true) : null)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <li className="mr-2">
          <Collapse isOpen={true}>
            <Badge color="success" pill href="#">
              <Wifi />
              <span className="align-middle ml-50 text-uppercase">Online</span>
            </Badge>
          </Collapse>
        </li>
        <IntlDropdown />
        <UserDropdown />
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarUser
