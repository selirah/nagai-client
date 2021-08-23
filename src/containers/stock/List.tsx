import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { Stock } from 'classes'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, Trash, AlertTriangle } from 'react-feather'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from 'components/DataTable'

const {
  getStockRequest,
  clearStates,
  setActiveLink,
  deleteStockRequest,
  setStock,
  setQueryParams
} = stockActions

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
        name: 'Stock ID',
        sortable: true,
        selector: (row: Stock) => row.id
      },
      {
        id: 2,
        name: 'Product ID',
        sortable: true,
        selector: (row: Stock) => row.productId
      },
      {
        id: 3,
        name: 'SKU',
        sortable: true,
        selector: (row: Stock) => row.sku
      },
      {
        id: 4,
        name: 'Unit Price',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.unitPrice}`
      },
      {
        id: 5,
        name: 'Quantity in Stock',
        sortable: true,
        selector: (row: Stock) => `${row.quantityInStock} ${row.unit}`
      },
      {
        id: 6,
        name: 'Stock Value',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.stockValue}`
      },
      {
        id: 7,
        name: 'Reorder Level',
        sortable: true,
        selector: (row: Stock) => `${row.reorderLevel} ${row.unit}`
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
              <Edit3
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#40C4FF"
              />
            </Link>
            <Trash
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

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={stock}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleStockSelection}
      pageSize={pageSize}
      server
      theme={mode}
      totalRows={totalRows}
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
      {store.stk ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
