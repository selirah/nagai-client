import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Spinner,
  UncontrolledTooltip
} from 'reactstrap'
import { ShoppingBag, Grid, Search, XCircle, PlusSquare } from 'react-feather'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import { Product } from '@classes/index'
import productActions from '@redux/products/actions'
import orderActions from '@redux/orders/actions'
import stockActions from '@redux/stock/actions'

interface Props {
  mainSidebar: boolean
}

const { getSearchedProductsRequest, clearSearchedProducts } = productActions
const { setActiveLink, setQueryParams, getOrdersRequest } = orderActions
const { getProductStockRequest } = stockActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.orders)
  const productStore = Selector((state) => state.products)

  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const history = useHistory()
  const [search, setSearch] = useState(false)

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list') {
        const { params } = store
        dispatch(setQueryParams(params))
        dispatch(getOrdersRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    if (query) {
      setSearch(true)
      dispatch(getSearchedProductsRequest(query))
    }
  }, [query, dispatch])

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (query && e.key !== undefined && e.key === 'Enter') {
        setSearch(true)
        dispatch(getSearchedProductsRequest(query))
      }
    },
    [query, dispatch]
  )

  const handleQueryFilter = useCallback(
    (e: MouseEvent<HTMLElement>, product: Product, activeLink: string) => {
      e.preventDefault()
      dispatch(setActiveLink(activeLink))

      dispatch(getProductStockRequest(product.id))
      history.push(`/admin/orders/product-stock/${product.id}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    const { activeLink } = store
    const { searchedProducts, loading } = productStore
    setLoading(loading)
    setActive(activeLink)
    setProducts(searchedProducts)
  }, [store, productStore])

  const renderSpinner = () => (
    <div className="m-auto text-center mt-5">
      <Spinner size="10" className="text-primary" />
    </div>
  )

  const renderEmptyResult = () => {
    return !search ? (
      <div className="no-results show px-2">
        <h5 className="text-primary small">Results would be shown here</h5>
      </div>
    ) : (
      <div className="no-results show px-2">
        <h5 className="text-danger small">No results found</h5>
      </div>
    )
  }

  const renderProductList = () => {
    return (
      products.length &&
      products.map((p, i) => (
        <ListGroupItem
          active={active === `${p.id}`}
          className="d-flex align-items-center"
          tag={Link}
          to="#"
          onClick={(e) => handleQueryFilter(e, p, p.productName)}
          action
          key={i}
        >
          <span className="bullet bullet-sm bullet-success mr-1"></span>
          <span className="align-middle">{p.productName}</span>
        </ListGroupItem>
      ))
    )
  }

  const clearSearchedData = useCallback(() => {
    setSearch(false)
    setQuery('')
    dispatch(clearSearchedProducts())
  }, [dispatch])

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
                  to={'/admin/orders'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <ShoppingBag className="mr-75" size={18} />
                  <span className="align-middle">Orders</span>
                </ListGroupItem>
              </ListGroup>
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/orders/add'}
                  active={active === 'add'}
                  onClick={() => handleActiveLink('add')}
                >
                  <PlusSquare className="mr-75" size={18} />
                  <span className="align-middle">Place Order</span>
                </ListGroupItem>
              </ListGroup>
              <Fragment>
                <div className="mt-3 px-2 d-flex justify-content-between">
                  <h6 className="section-label mb-1">Search for product</h6>
                  <Grid size={14} />
                </div>
                <div className="px-2">
                  <InputGroup className="input-group-merge">
                    <Input
                      value={query}
                      onChange={handleChange}
                      placeholder="product id or name"
                      onKeyPress={onKeyPress}
                    />
                    <InputGroupAddon
                      addonType="append"
                      className="cursor-pointer"
                      onClick={handleSearch}
                    >
                      <InputGroupText>
                        <Search className="text-muted" size={14} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <Fragment>
                  <div className="mt-3 px-2 d-flex justify-content-between">
                    <h6 className="section-label mb-1">Search Results</h6>
                    <XCircle
                      size={16}
                      className="cursor-pointer text-primary"
                      onClick={clearSearchedData}
                      id="clear"
                      style={{ outline: 'none' }}
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="clear"
                      style={{ outline: 'none' }}
                    >
                      Clear all
                    </UncontrolledTooltip>
                  </div>
                  <ListGroup className="list-group-labels">
                    {loading
                      ? renderSpinner()
                      : products.length
                      ? renderProductList()
                      : renderEmptyResult()}
                  </ListGroup>
                </Fragment>
              </Fragment>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
