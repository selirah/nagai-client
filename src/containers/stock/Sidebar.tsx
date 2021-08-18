import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  MouseEvent,
  ChangeEvent
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
  Spinner
} from 'reactstrap'
import { List, Grid, Search } from 'react-feather'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { Product } from 'classes'
import productActions from 'redux/products/actions'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink, setQueryParams, getStockRequest } = stockActions
const { getSearchedProductsRequest, setProduct } = productActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.stock)
  const productStore = Selector((state) => state.products)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const history = useHistory()

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list') {
        const { params } = store
        dispatch(setQueryParams(params))
        dispatch(getStockRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    dispatch(getSearchedProductsRequest(query))
  }, [query, dispatch])

  const handleQueryFilter = useCallback(
    (e: MouseEvent<HTMLElement>, product: Product, activeLink: string) => {
      e.preventDefault()
      dispatch(setActiveLink(activeLink))
      if (product.stock.length) {
        history.push(`/admin/stock/select/${product.id}`)
      } else {
        history.push(`/admin/stock/add/${product.id}`)
      }
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
      <Spinner size={10} className="text-primary" />
    </div>
  )

  const renderEmptyResult = () => (
    <div className="no-results show px-2">
      <h5 className="text-warning">No results found</h5>
    </div>
  )

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
                  to={'/admin/stock'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <List className="mr-75" size={18} />
                  <span className="align-middle">Stock List</span>
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
                    <Grid size={14} />
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
