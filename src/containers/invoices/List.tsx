import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import invoiceActions from '@redux/invoices/actions'
import { Invoice } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'

const {
  getInvoicesRequest,
  clearStates,
  setActiveLink,
  setQueryParams,
  setInvoice
} = invoiceActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.invoices)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>([])
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
    dispatch(getInvoicesRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Invoice ID',
        sortable: true,
        selector: (row: Invoice) => row.id
      },
      {
        id: 2,
        name: 'Order ID',
        sortable: true,
        selector: (row: Invoice) => row.orderId
      },
      {
        id: 3,
        name: 'Discount',
        sortable: true,
        selector: (row: Invoice) => `GHC ${row.discount}`
      },
      {
        id: 4,
        name: 'Delivery Fee',
        sortable: true,
        selector: (row: Invoice) => `GHC ${row.deliveryFee}`
      },
      {
        id: 5,
        name: 'Overall Cost',
        sortable: true,
        selector: (row: Invoice) => `GHC ${row.finalAmount}`
      },
      {
        id: 6,
        name: 'Date',
        sortable: true,
        selector: (row: Invoice) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      }
    ],
    []
  )

  useEffect(() => {
    const { loading, invoices, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (invoices.length) {
      setInvoices(invoices)
      setTotalRows(count)
    } else {
      setInvoices(invoices)
    }
    setMode(mode)
  }, [store, pageSize, layoutStore])

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
      dispatch(getInvoicesRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getInvoicesRequest(params))
    },
    [dispatch, store]
  )

  const handleInvoiceSelection = useCallback(
    (invoice: Invoice) => {
      dispatch(setInvoice(invoice))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={invoices}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleInvoiceSelection}
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
      {store.invoice ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
