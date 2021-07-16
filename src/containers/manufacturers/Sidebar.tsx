import React, { useState, useCallback } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Grid, PlusCircle, List } from 'react-feather'

interface Props {
  mainSidebar: boolean
}

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const [activeLink, setActiveLink] = useState('list')

  const handleActiveLink = useCallback((value: string) => {
    setActiveLink(value)
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
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/manufacturers'}
                  active={activeLink === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <List className="mr-75" size={18} />
                  <span className="align-middle">Manufacturers</span>
                </ListGroupItem>

                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/manufacturers/add'}
                  active={activeLink === 'add'}
                  onClick={() => handleActiveLink('add')}
                >
                  <PlusCircle className="mr-75" size={18} />
                  <span className="align-middle">Add Manufacturer</span>
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h6 className="section-label mb-1">Group by statuses/tags</h6>
                <Grid size={14} />
              </div>
              <ListGroup className="list-group-labels">
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/ready_to_sync"
                  action
                >
                  <span className="bullet bullet-sm bullet-primary mr-1"></span>
                  <span className="align-middle">Ready to sync</span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/completed"
                  action
                >
                  <span className="bullet bullet-sm bullet-success mr-1"></span>
                  <span className="align-middle">Completed</span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/synced_to_broker"
                  action
                >
                  <span className="bullet bullet-sm bullet-info mr-1"></span>
                  <span className="align-middle">Syncronized</span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/waiting_images"
                  action
                >
                  <span className="bullet bullet-sm bullet-warning mr-1"></span>
                  <span className="align-middle">Waiting images</span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/waiting_profile"
                  action
                >
                  <span className="bullet bullet-sm bullet-warning mr-1"></span>
                  <span className="align-middle">Waiting profile</span>
                </ListGroupItem>
                <ListGroupItem
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/accounts/tags/error_broker_sync"
                  action
                >
                  <span className="bullet bullet-sm bullet-danger mr-1"></span>
                  <span className="align-middle">Error on sync</span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
