import React, { useState, useCallback, useEffect, MouseEvent } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { PlusCircle, List, Map, Grid } from 'react-feather'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import territoryActions from 'redux/terrirtories/actions'
import { useDispatch } from 'react-redux'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink, setQueryParams, getTerritoryRequest } = territoryActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.territories)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list' || value === 'map') {
        const { params } = store
        params.region = 0
        dispatch(setQueryParams(params))
        dispatch(getTerritoryRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleQueryFilter = useCallback(
    (e: MouseEvent<HTMLElement>, param: number, activeLink: string) => {
      e.preventDefault()
      const { params } = store
      params.region = param
      dispatch(setQueryParams(params))
      dispatch(setActiveLink(activeLink))
      dispatch(getTerritoryRequest(params))
    },
    [dispatch, store]
  )

  useEffect(() => {
    const { activeLink } = store
    setActive(activeLink)
  }, [store])

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
                  to={'/admin/territories'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <List className="mr-75" size={18} />
                  <span className="align-middle">Territories</span>
                </ListGroupItem>

                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/territories/map'}
                  active={active === 'map'}
                  onClick={() => handleActiveLink('map')}
                >
                  <Map className="mr-75" size={18} />
                  <span className="align-middle">Map View</span>
                </ListGroupItem>

                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/territories/add'}
                  active={active === 'add'}
                  onClick={() => handleActiveLink('add')}
                >
                  <PlusCircle className="mr-75" size={18} />
                  <span className="align-middle">Add Territory</span>
                </ListGroupItem>
              </ListGroup>
              {store.regions.length ? (
                <PerfectScrollbar
                  className="sidebar-menu-list"
                  options={{ wheelPropagation: false }}
                >
                  <div className="mt-3 px-2 d-flex justify-content-between">
                    <h6 className="section-label mb-1">Group by category</h6>
                    <Grid size={14} />
                  </div>
                  <ListGroup className="list-group-labels">
                    {store.regions.map((r, i) => (
                      <ListGroupItem
                        active={active === `${r.id}`}
                        className="d-flex align-items-center"
                        tag={Link}
                        to="#"
                        onClick={(e) => handleQueryFilter(e, r.id, r.region)}
                        action
                        key={i}
                      >
                        <span className="bullet bullet-sm bullet-info mr-1"></span>
                        <span className="align-middle">{r.region}</span>
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
