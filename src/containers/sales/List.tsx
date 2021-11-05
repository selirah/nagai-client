import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import saleActions from '@redux/sales/actions'
import { Sale, SaleStatus } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'
import { Badge } from 'reactstrap'
import { Edit3 } from 'react-feather'
import { Link } from 'react-router-dom'
import RippleButton from '@core/components/ripple-button'

const { getSalesRequest, clearStates, setActiveLink, setQueryParams, setSale } =
  saleActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.sales)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [sales, setSales] = useState<Sale[]>([])
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
    params.status = SaleStatus.ALL
    dispatch(setQueryParams(params))
    dispatch(getSalesRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBadge = useCallback((status: string) => {
    switch (status) {
      case SaleStatus.PENDING:
        return (
          <Badge className="text-uppercase" color="primary" pill>
            {status}
          </Badge>
        )
      case SaleStatus.PAYING:
        return (
          <Badge className="text-uppercase" color="secondary" pill>
            {status}
          </Badge>
        )
      case SaleStatus.PAID:
        return (
          <Badge className="text-uppercase" color="success" pill>
            {status}
          </Badge>
        )
      case SaleStatus.FAILED:
        return (
          <Badge className="text-uppercase" color="danger" pill>
            {status.toUpperCase()}
          </Badge>
        )
    }
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Sale ID',
        sortable: true,
        selector: (row: Sale) => row.id
      },
      {
        id: 2,
        name: 'Order ID',
        sortable: true,
        selector: (row: Sale) => row.orderId
      },
      {
        id: 3,
        name: 'Invoice ID',
        sortable: true,
        selector: (row: Sale) => row.invoiceId
      },
      {
        id: 4,
        name: 'Amount',
        sortable: true,
        selector: (row: Sale) => `GHC ${row.amount}`
      },
      {
        id: 5,
        name: 'Amount Paid',
        sortable: true,
        selector: (row: Sale) => `GHC ${row.amountPaid}`
      },
      {
        id: 6,
        name: 'Amount Left',
        sortable: true,
        selector: (row: Sale) => `GHC ${row.amountLeft}`
      },
      {
        id: 7,
        name: 'Status',
        sortable: true,
        selector: (row: Sale) => renderBadge(row.status)
      },
      {
        id: 6,
        name: 'Date',
        sortable: true,
        selector: (row: Sale) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      },
      {
        cell: (row: Sale) => (
          <Fragment>
            <Link to={`/admin/sales/edit/${row.id}`}>
              <Edit3
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#40C4FF"
              />
            </Link>
            <RippleButton
              tag={Link}
              to={`/admin/payments/add/${row.id}`}
              size="sm"
            >
              Pay
            </RippleButton>
          </Fragment>
        )
      }
    ],
    [renderBadge]
  )

  useEffect(() => {
    const { loading, sales, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (sales.length) {
      setSales(sales)
      setTotalRows(count)
    } else {
      setSales(sales)
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
      dispatch(getSalesRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getSalesRequest(params))
    },
    [dispatch, store]
  )

  const handleSaleSelection = useCallback(
    (sale: Sale) => {
      dispatch(setSale(sale))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={sales}
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
      {store.sale ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
