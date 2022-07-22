import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  MouseEvent
} from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { PlusCircle, List, Grid } from 'react-feather'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import productActions from '@redux/products/actions'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink, setQueryParams, getProductsRequest } = productActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.products)
  const { manufacturers } = Selector((state) => state.manufacturers)
  const { categories } = Selector((state) => state.categories)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list') {
        const { params } = store
        params.category = 0
        params.manufacturer = 0
        dispatch(setQueryParams(params))
        dispatch(getProductsRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleQueryFilter = useCallback(
    (
      e: MouseEvent<HTMLElement>,
      param: number,
      type: string,
      activeLink: string
    ) => {
      e.preventDefault()
      const { params } = store
      if (type === 'category') {
        params.category = param
        params.manufacturer = 0
      } else if (type === 'manufacturer') {
        params.manufacturer = param
        params.category = 0
      }
      dispatch(setQueryParams(params))
      dispatch(setActiveLink(activeLink))
      dispatch(getProductsRequest(params))
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
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/products'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <List className="mr-75" size={18} />
                  <span className="align-middle">Products</span>
                </ListGroupItem>

                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/products/add'}
                  active={active === 'add'}
                  onClick={() => handleActiveLink('add')}
                >
                  <PlusCircle className="mr-75" size={18} />
                  <span className="align-middle">Add Product</span>
                </ListGroupItem>
              </ListGroup>
              {categories.length ? (
                <Fragment>
                  <div className="mt-3 px-2 d-flex justify-content-between">
                    <h6 className="section-label mb-1">Group by category</h6>
                    <Grid size={14} />
                  </div>
                  <ListGroup className="list-group-labels">
                    {categories.map((c, i) => (
                      <ListGroupItem
                        active={active === `${c.id}`}
                        className="d-flex align-items-center"
                        tag={Link}
                        to="#"
                        onClick={(e) =>
                          handleQueryFilter(e, c.id, 'category', c.category)
                        }
                        action
                        key={i}
                      >
                        <span className="bullet bullet-sm bullet-info mr-1"></span>
                        <span className="align-middle">
                          {c.category.toLowerCase()}
                        </span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Fragment>
              ) : null}
              {manufacturers.length ? (
                <Fragment>
                  <div className="mt-3 px-2 d-flex justify-content-between">
                    <h6 className="section-label mb-1">
                      Group by manufacturer
                    </h6>
                    <Grid size={14} />
                  </div>
                  <ListGroup className="list-group-labels">
                    {manufacturers.map((m, i) => (
                      <ListGroupItem
                        active={active === `${m.id}`}
                        className="d-flex align-items-center"
                        tag={Link}
                        to="#"
                        onClick={(e) =>
                          handleQueryFilter(e, m.id, 'manufacturer', m.name)
                        }
                        action
                        key={i}
                      >
                        <span className="bullet bullet-sm bullet-success mr-1"></span>
                        <span className="align-middle">
                          {m.name.toLowerCase()}
                        </span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Fragment>
              ) : null}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
