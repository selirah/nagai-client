import React, { useState, useCallback, useEffect, MouseEvent } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { UserPlus, Users, Grid } from 'react-feather'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import userActions from 'redux/users/actions'
import { useDispatch } from 'react-redux'
import { Roles } from 'classes'
import { userRoles } from 'utils/ability'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink, setQueryParams, getUsersRequest } = userActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.users)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list') {
        const { params } = store
        params.role = ''
        params.skip = 0
        dispatch(setQueryParams(params))
        dispatch(getUsersRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleQueryFilter = useCallback(
    (e: MouseEvent<HTMLElement>, param: string, activeLink: string) => {
      e.preventDefault()
      const { params } = store
      params.role = param
      params.skip = 0
      dispatch(setQueryParams(params))
      dispatch(setActiveLink(activeLink))
      dispatch(getUsersRequest(params))
    },
    [dispatch, store]
  )

  useEffect(() => {
    const { activeLink } = store
    setActive(activeLink)
  }, [store])

  const renderBullet = useCallback((role: string) => {
    switch (role) {
      case userRoles.admin:
        return <span className="bullet bullet-sm bullet-primary mr-1"></span>
      case userRoles.agent:
        return <span className="bullet bullet-sm bullet-secondary mr-1"></span>
      case userRoles.dispatch:
        return <span className="bullet bullet-sm bullet-info mr-1"></span>
    }
  }, [])

  return (
    <div
      className={classnames('sidebar-left', {
        show: mainSidebar === true
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content todo-sidebar">
          <div className="todo-app-menu">
            <div className="add-task"></div>
            <div className="sidebar-menu-list">
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/users'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <Users className="mr-75" size={18} />
                  <span className="align-middle">Users</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/users/add'}
                  active={active === 'add'}
                  onClick={() => handleActiveLink('add')}
                >
                  <UserPlus className="mr-75" size={18} />
                  <span className="align-middle">Add User</span>
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h6 className="section-label mb-1">Group by role</h6>
                <Grid size={14} />
              </div>
              {Roles.length ? (
                <PerfectScrollbar
                  className="sidebar-menu-list"
                  options={{ wheelPropagation: false }}
                >
                  <ListGroup className="list-group-labels">
                    {Roles.map((r, i) => (
                      <ListGroupItem
                        active={active === `${r.role}`}
                        className="d-flex align-items-center"
                        tag={Link}
                        to="#"
                        onClick={(e) => handleQueryFilter(e, r.role, r.role)}
                        action
                        key={i}
                      >
                        {renderBullet(r.role)}
                        <span className="align-middle">{r.role}</span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </PerfectScrollbar>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
