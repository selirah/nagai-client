import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useMemo
} from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import orderActions from 'redux/orders/actions'
import { Order, OrderStatus } from 'classes'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, AlertTriangle } from 'react-feather'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from 'components/DataTable'
import { Badge } from 'reactstrap'
import ExpandedRow from './ExpandedRow'

const {
  getOrdersRequest,
  clearStates,
  setActiveLink,
  setQueryParams,
  setOrder
} = orderActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.orders)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.fromDate = ''
    params.toDate = ''
    params.status = OrderStatus.ALL
    dispatch(setQueryParams(params))
    dispatch(getOrdersRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBadge = useCallback((role: string) => {
    switch (role) {
      case OrderStatus.PENDING:
        return (
          <Badge className="text-uppercase" color="primary" pill>
            {role}
          </Badge>
        )
      case OrderStatus.DELIVERED:
        return (
          <Badge className="text-uppercase" color="success" pill>
            {role}
          </Badge>
        )
      case OrderStatus.FAILED:
        return (
          <Badge className="text-uppercase" color="danger" pill>
            {role.toUpperCase()}
          </Badge>
        )
    }
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Order Number',
        sortable: true,
        selector: (row: Order) => row.id
      },
      {
        id: 2,
        name: 'Order Total',
        sortable: true,
        selector: (row: Order) => `GHS ${row.orderTotal}`
      },
      {
        id: 3,
        name: 'Status',
        sortable: true,
        selector: (row: Order) => renderBadge(row.status)
      },
      {
        id: 4,
        name: 'Agent',
        sortable: true,
        selector: (row: Order) =>
          `${row.agent.firstName.toUpperCase()} ${row.agent.lastName.toUpperCase()}`
      },
      {
        id: 5,
        name: 'Order Date',
        sortable: true,
        selector: (row: Order) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      },
      {
        cell: (row: Order) => (
          <Link to={`/admin/orders/edit/${row.id}`}>
            <Edit3
              size={14}
              className="mr-lg-1"
              style={{ outline: 'none' }}
              color="#40C4FF"
            />
          </Link>
        )
      }
    ],
    [renderBadge]
  )

  useEffect(() => {
    const { loading, orders, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (orders.length) {
      setOrders(orders)
      setTotalRows(count)
    } else {
      setOrders(orders)
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
      dispatch(getOrdersRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getOrdersRequest(params))
    },
    [dispatch, store]
  )

  const handleOrderSelection = useCallback(
    (order: Order) => {
      dispatch(setOrder(order))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={orders}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleOrderSelection}
      pageSize={pageSize}
      server
      theme={mode}
      totalRows={totalRows}
      expandableRows
      expandableRowsComponent={<ExpandedRow />}
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
      {/* {store.order ? (
    <Drawer
      toggleDrawer={toggleDrawer}
      handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
    />
  ) : null} */}
    </Fragment>
  )
}

export default List
