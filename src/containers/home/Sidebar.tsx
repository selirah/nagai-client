import React, { useState, useCallback, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import { ListGroup, ListGroupItem } from 'reactstrap'
import * as Icons from 'react-feather'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import homeActions from '@redux/home/actions'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink } = homeActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.home)
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
      <div className="sidebar card">
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
                  className="cursor-pointer"
                  active={active === 'orders'}
                  onClick={() => handleActiveLink('orders')}
                >
                  <Icons.ShoppingBag className="mr-75" size={18} />
                  <span className="align-middle">Orders</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'deliveries'}
                  onClick={() => handleActiveLink('deliveries')}
                >
                  <Icons.Truck className="mr-75" size={18} />
                  <span className="align-middle">Deliveries</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'sales'}
                  onClick={() => handleActiveLink('sales')}
                >
                  <Icons.Briefcase className="mr-75" size={18} />
                  <span className="align-middle">Sales</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'payments'}
                  onClick={() => handleActiveLink('payments')}
                >
                  <Icons.Truck className="mr-75" size={18} />
                  <span className="align-middle">Payments</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'products'}
                  onClick={() => handleActiveLink('products')}
                >
                  <Icons.Coffee className="mr-75" size={18} />
                  <span className="align-middle">Products</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'stock'}
                  onClick={() => handleActiveLink('stock')}
                >
                  <Icons.CheckCircle className="mr-75" size={18} />
                  <span className="align-middle">Stock</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'invoices'}
                  onClick={() => handleActiveLink('invoices')}
                >
                  <Icons.Paperclip className="mr-75" size={18} />
                  <span className="align-middle">Invoices</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'outlets'}
                  onClick={() => handleActiveLink('outlets')}
                >
                  <Icons.CloudLightning className="mr-75" size={18} />
                  <span className="align-middle">Outlets</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'manufacturers'}
                  onClick={() => handleActiveLink('manufacturers')}
                >
                  <Icons.Server className="mr-75" size={18} />
                  <span className="align-middle">Manufacturers</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="cursor-pointer"
                  active={active === 'territories'}
                  onClick={() => handleActiveLink('territories')}
                >
                  <Icons.Map className="mr-75" size={18} />
                  <span className="align-middle">Territories</span>
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
