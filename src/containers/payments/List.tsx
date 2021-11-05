import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import paymentActions from '@redux/payments/actions'
import { Payment } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'
import { Edit3 } from 'react-feather'
import { Link } from 'react-router-dom'
import RippleButton from '@core/components/ripple-button'

const {
  getPaymentsRequest,
  clearStates,
  setActiveLink,
  setQueryParams,
  setPayment
} = paymentActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.payments)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [payments, setPayments] = useState<Payment[]>([])
  const [pageSize, setPageSize] = useState(store.params.page)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)
  const [currentPage, setCurrentPage] = useState(1)
  // const [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getPaymentsRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Sale ID',
        sortable: true,
        selector: (row: Payment) => row.saleId
      },
      {
        id: 2,
        name: 'Amount',
        sortable: true,
        selector: (row: Payment) => `GHC ${row.amount}`
      },
      {
        id: 3,
        name: 'Payer',
        sortable: true,
        selector: (row: Payment) => row.payer.toUpperCase()
      },
      {
        id: 4,
        name: 'Phone',
        sortable: true,
        selector: (row: Payment) => row.payerPhone
      },
      {
        id: 5,
        name: 'Payee',
        sortable: true,
        selector: (row: Payment) =>
          `${row.payee.firstName.toUpperCase()} ${row.payee.lastName.toUpperCase()}`
      },
      {
        id: 6,
        name: 'Created Date',
        sortable: true,
        selector: (row: Payment) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      },
      {
        cell: (row: Payment) => (
          <Fragment>
            <Link to={`/admin/payments/edit/${row.id}`}>
              <Edit3
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#40C4FF"
              />
            </Link>
            <RippleButton size="sm">Receipt</RippleButton>
          </Fragment>
        )
      }
    ],
    []
  )

  useEffect(() => {
    const { loading, payments, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (payments.length) {
      setPayments(payments)
      setTotalRows(count)
    } else {
      setPayments(payments)
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
      dispatch(getPaymentsRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getPaymentsRequest(params))
    },
    [dispatch, store]
  )

  const handleSaleSelection = useCallback(
    (payment: Payment) => {
      dispatch(setPayment(payment))
      // setToggleDrawer(!toggleDrawer)
    },
    [dispatch /*, toggleDrawer*/]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={payments}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleSaleSelection}
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
      {/* {store.payment ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null} */}
    </Fragment>
  )
}

export default List
