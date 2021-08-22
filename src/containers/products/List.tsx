import { useEffect, useState, Fragment, useCallback, MouseEvent } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import productActions from 'redux/products/actions'
import { Product } from 'classes'
import { isEmpty } from 'utils'
import Spinner from 'components/Spinner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ReactSortable } from 'react-sortablejs'
import classnames from 'classnames'
import { MoreVertical, Edit2, Trash2, AlertTriangle } from 'react-feather'
import Avatar from 'core/components/avatar'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import PaginationComponent from 'components/Pagination'
import Empty from 'components/EmptyBox'

const {
  getProductsRequest,
  reorderList,
  clearStates,
  setActiveLink,
  deleteProductRequest,
  setProduct,
  setQueryParams
} = productActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const { params } = store
    params.category = 0
    params.manufacturer = 0
    params.skip = 0
    dispatch(setQueryParams(params))
    dispatch(getProductsRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: string, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteProductRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const handleProductSelection = useCallback(
    (product: Product) => {
      dispatch(setProduct(product))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const handlePageClick = useCallback(
    (e: MouseEvent<HTMLElement>, index: number) => {
      e.preventDefault()
      setCurrentPage(index)
      const { params } = store
      if (index > params.skip) {
        params.skip = params.skip + pageSize
      } else if (index < params.skip) {
        params.skip = params.skip - pageSize
      }
      dispatch(setQueryParams(params))
      dispatch(getProductsRequest(params))
    },
    [dispatch, pageSize, store]
  )

  useEffect(() => {
    const {
      loading,
      products,
      searchText,
      isDeleted,
      errors,
      count,
      filtered
    } = store
    setLoading(loading)
    if (products.length) {
      setPageCount(Math.ceil(count / pageSize))
      if (!isEmpty(searchText)) {
        setProducts(filtered)
      } else {
        setProducts(products)
      }
    } else {
      setProducts(products)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Product')).then(function (res) {
        if (res.value) {
          dispatch(clearStates())
        }
      })
    }
    if (errors) {
      toast.error(
        <ToastBox
          color="danger"
          icon={<AlertTriangle />}
          message={JSON.stringify(errors)}
          title="Ooops . . ."
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
    }
  }, [store, sweetAlert, dispatch, pageSize])

  const renderLoader = () => <Spinner />

  const renderEmptyList = () => <Empty />

  const renderAvatar = (product: Product) => {
    if (product) {
      return (
        <Avatar
          color="warning"
          content={`${product.productName.toUpperCase()}`}
          initials
        />
      )
    }
  }

  const renderList = () => (
    <PerfectScrollbar
      options={{ wheelPropagation: false }}
      containerRef={(ref: any) => {
        if (ref) {
          ref._getBoundingClientRect = ref.getBoundingClientRect
          ref.getBoundingClientRect = () => {
            const original = ref._getBoundingClientRect()

            return { ...original, height: Math.floor(original.height) }
          }
        }
      }}
    >
      <ReactSortable
        tag="ul"
        list={products}
        handle=".drag-icon"
        className="todo-task-list media-list"
        setList={(state: Product[]) => dispatch(reorderList(state))}
      >
        {products.map((item) => (
          <li
            key={item.id}
            className={classnames('todo-item', { completed: false })}
          >
            <div className="todo-title-wrapper">
              <div
                className="todo-title-area"
                onClick={() => handleProductSelection(item)}
              >
                <MoreVertical className="drag-icon" />
                {renderAvatar(item)}
                <span className="todo-title">{`${item.productName}`}</span>
              </div>
              <div className="todo-item-action mt-lg-0 mt-50">
                <small className="text-nowrap text-muted mr-lg-1">
                  {moment(item.createdAt).format('MMM Do')}
                </small>
                <Link to={`/admin/products/edit/${item.id}`}>
                  <Edit2
                    size={14}
                    className="mr-lg-1"
                    style={{ outline: 'none' }}
                    color="#40C4FF"
                  />
                </Link>
                <Trash2
                  size={14}
                  style={{ outline: 'none' }}
                  color="#F44336"
                  onClick={() => handleDelete(item.id, item.productName)}
                />
              </div>
            </div>
          </li>
        ))}
      </ReactSortable>
    </PerfectScrollbar>
  )

  const renderPagination = () => (
    <PaginationComponent
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      pageCount={pageCount}
    />
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        {loading ? (
          renderLoader()
        ) : products.length ? (
          <Fragment>
            {renderList()}
            {renderPagination()}
          </Fragment>
        ) : (
          renderEmptyList()
        )}
      </div>
      {store.product ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
