import React, { useState, useCallback, useEffect } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Paperclip } from 'react-feather'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import invoiceActions from '@redux/invoices/actions'
import { useDispatch } from 'react-redux'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink } = invoiceActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.invoices)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()

  const handleActiveLink = useCallback(
    (value: string) => {
      dispatch(setActiveLink(value))
    },
    [dispatch]
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
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/invoices'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <Paperclip className="mr-75" size={18} />
                  <span className="align-middle">Invoices</span>
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
