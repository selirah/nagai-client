import {
  useEffect,
  useState,
  Fragment,
  useCallback,
  MouseEvent,
  useMemo
} from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { Stock } from 'classes'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import {
  Edit2,
  Trash2,
  AlertTriangle,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  SkipBack,
  SkipForward
} from 'react-feather'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import Empty from 'components/EmptyBox'
import DataTable, {
  IDataTableColumn,
  createTheme,
  IDataTableStyles
} from 'react-data-table-component'
import { ScaleLoader } from 'react-spinners'

const {
  getStockRequest,
  clearStates,
  setActiveLink,
  deleteStockRequest,
  setStock,
  setQueryParams
} = stockActions

createTheme('dark', {
  text: {
    primary: '#b4b7bd',
    secondary: '#b4b7bd'
  },
  background: {
    default: '#283046'
  },
  context: {
    background: '#283046',
    text: '#b4b7bd'
  },
  divider: {
    default: '#b4b7bd'
  },
  action: {
    button: '#b4b7bd',
    hover: '#b4b7bd',
    disabled: '#b4b7bd'
  }
})

const customStyles: IDataTableStyles = {
  rows: {
    style: {
      minHeight: '38px', // override the row height,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontWeight: 'bolder',
      fontSize: '11px',
      textTransform: 'uppercase',
      textAlign: 'center'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px'
    }
  }
}

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.stock)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [stock, setStockArray] = useState<Stock[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
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

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Product ID',
        sortable: true,
        selector: (row: Stock) => row.productId
      },
      {
        id: 2,
        name: 'SKU',
        sortable: true,
        selector: (row: Stock) => row.sku
      },
      {
        id: 3,
        name: 'Unit Price',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.unitPrice}`
      },
      {
        id: 4,
        name: 'Quantity in Stock',
        sortable: true,
        selector: (row: Stock) => `${row.quantityInStock} ${row.unit}`
      },
      {
        id: 5,
        name: 'Stock Value',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.stockValue}`
      },
      {
        id: 6,
        name: 'Reorder Level',
        sortable: true,
        selector: (row: Stock) => `${row.reorderLevel} ${row.unit}`
      },
      {
        id: 7,
        name: 'Created Date',
        sortable: true,
        selector: (row: Stock) => moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 8,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Stock) => moment(row.updatedAt).format("MMM Do, 'YY")
      },
      {
        cell: (row: Stock) => (
          <Fragment>
            <Link to={`/admin/stock/edit/${row.id}`}>
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
              className="cursor-pointer"
              onClick={() => handleDelete(row.id, row.id)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  useEffect(() => {
    const { loading, stock, isDeleted, errors, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (stock.length) {
      setStockArray(stock)
      setTotalRows(count)
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
    setMode(mode)
  }, [store, sweetAlert, dispatch, pageSize, layoutStore])

  const handlePageClick = useCallback(
    (page: number) => {
      const { params } = store
      if (page > currentPage) {
        params.skip = params.skip + pageSize
      } else if (page < currentPage) {
        params.skip = params.skip - pageSize
      }
      setCurrentPage(page)
      dispatch(setQueryParams(params))
      dispatch(getStockRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getStockRequest(params))
    },
    [dispatch, store]
  )

  const handleStockSelection = useCallback(
    (stock: Stock) => {
      dispatch(setStock(stock))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderLoader = () => (
    <div className="mt-5 text-primary">
      <ScaleLoader color="#0090fe" />
    </div>
  )

  const renderEmptyList = () => <Empty />

  const renderList = () => (
    <DataTable
      columns={columns}
      keyField="id"
      data={stock}
      defaultSortField="name"
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageClick}
      paginationPerPage={pageSize}
      paginationIconNext={<ChevronRight />}
      paginationIconPrevious={<ChevronLeft />}
      paginationIconFirstPage={<SkipBack />}
      paginationIconLastPage={<SkipForward />}
      noHeader
      theme={mode}
      sortIcon={<ArrowDown />}
      customStyles={customStyles}
      progressPending={loading}
      progressComponent={renderLoader()}
      noDataComponent={renderEmptyList()}
      onRowClicked={handleStockSelection}
      striped
    />
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
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
          {renderList()}
        </PerfectScrollbar>
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
