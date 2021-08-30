import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'core/components/avatar'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import authActions from 'redux/auth/actions'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Collapse
} from 'reactstrap'
import { LogOut, Settings, UserCheck } from 'react-feather'
import defaultAvatar from 'assets/images/avatars/avatar.png'
import { removeItem } from 'utils/localstorage'
import { PUBLIC_ROUTES } from 'router/constants'

const { logout } = authActions

const UserDropdown = () => {
  const store = Selector((state) => state.auth)
  const dispatch: Dispatch = useDispatch()

  const userAvatar = (store.user && store.user.avatar) || defaultAvatar

  const onLogoutUser = useCallback(() => {
    removeItem('user')
    removeItem('token')
    removeItem('persist:root')
    dispatch(logout())
  }, [dispatch])

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href={PUBLIC_ROUTES.LANDING}
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none"></div>
        <Avatar src={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu right>
        <Collapse isOpen={true}>
          <DropdownItem tag={Link} to={PUBLIC_ROUTES.LANDING}>
            <UserCheck size={14} className="mr-75" />
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem tag={Link} to={PUBLIC_ROUTES.LANDING}>
            <Settings size={14} className="mr-75" />
            <span className="align-middle">Settings</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={PUBLIC_ROUTES.LANDING}
            onClick={onLogoutUser}
          >
            <LogOut size={14} className="mr-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
        </Collapse>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
