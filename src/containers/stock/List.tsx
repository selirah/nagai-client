import { useEffect, useState, Fragment, useCallback, MouseEvent } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { Stock } from 'classes'
import { isEmpty } from 'utils'
import Spinner from 'components/Spinner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import { MoreVertical, Edit2, Trash2, AlertTriangle } from 'react-feather'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import PaginationComponent from 'components/Pagination'
import Empty from 'components/EmptyBox'
import DataTable, { IDataTableColumn } from 'react-data-table-component'

const {
  getStockRequest,
  clearStates,
  setActiveLink,
  deleteStockRequest,
  setStock,
  setQueryParams
} = stockActions

const columns: IDataTableColumn[] = [
  {
    id: 1,
    name: 'Name',
    sortable: true,
    selector: (row) => row.name
  },
  {
    id: 2,
    name: 'Director',
    sortable: true,
    selector: (row) => row.director
  }
]

const data = [
  {
    id: 1,
    name: 'Edward',
    director: 'Test'
  },
  {
    id: 2,
    name: 'Deborah',
    director: 'Test'
  }
]

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.stock)
  const [loading, setLoading] = useState(false)
  const [stock, setStockArray] = useState<Stock[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.fromDate = ''
    params.toDate = ''
    dispatch(getStockRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: string, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteStockRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const handleStockSelection = useCallback(
    (stock: Stock) => {
      dispatch(setStock(stock))
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
      dispatch(getStockRequest(params))
    },
    [dispatch, pageSize, store]
  )

  useEffect(() => {
    const { loading, stock, isDeleted, errors, count } = store
    setLoading(loading)
    if (stock.length) {
      setPageCount(Math.ceil(count / pageSize))
      setStockArray(stock)
    } else {
      setStockArray(stock)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Stock')).then(function (res) {
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

  const renderList = () => (
    <DataTable
      columns={columns}
      keyField="id"
      striped
      data={data}
      defaultSortField="name"
      pagination
    />
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        {loading ? (
          renderLoader()
        ) : stock.length ? (
          <Fragment>{renderList()}</Fragment>
        ) : (
          renderEmptyList()
        )}
      </div>
      {/* {store.stk ? (
    <Drawer
      toggleDrawer={toggleDrawer}
      handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
    />
  ) : null} */}
    </Fragment>
  )
}

export default List
