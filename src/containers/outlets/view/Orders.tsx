import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { Outlet, Order } from '@classes/index'
import { Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap'
import outletActions from '@redux/outlets/actions'
import { IDataTableColumn } from 'react-data-table-component'
import DataTable from '@components/DataTable'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const { getOrderRequest, setOrderParams } = outletActions

interface Props {
  outlet: Outlet
  theme: string
}

const Orders: React.FC<Props> = (props) => {
  const { outlet, theme } = props
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.outlets)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [pageSize, setPageSize] = useState(store.orderParams.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRows, setTotalRows] = useState(store.orderCount)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    const { orderParams } = store
    orderParams.skip = 0
    orderParams.id = outlet.id
    dispatch(getOrderRequest(orderParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        name: 'Created Date',
        sortable: true,
        selector: (row: Order) => moment(row.createdAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  useEffect(() => {
    const { orders, loadOrders, orderCount } = store
    setLoading(loadOrders)
    if (orders.length) {
      setOrders(orders)
      setTotalRows(orderCount)
    } else {
      setOrders(orders)
    }
  }, [store, pageSize])

  const handlePageClick = useCallback(
    (page: number) => {
      const { orderParams } = store
      if (page > currentPage) {
        orderParams.skip = orderParams.skip + pageSize
      } else if (page < currentPage) {
        orderParams.skip = orderParams.skip - pageSize
      }
      setCurrentPage(page)
      dispatch(setOrderParams(orderParams))
      dispatch(getOrderRequest(orderParams))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { orderParams } = store
      orderParams.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getOrderRequest(orderParams))
    },
    [dispatch, store]
  )

  const handleSearch = useCallback(() => {
    const { orderParams } = store
    orderParams.skip = 0
    orderParams.fromDate = startDate ? new Date(startDate).toISOString() : ''
    orderParams.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getOrderRequest(orderParams))
  }, [dispatch, store, startDate, endDate])

  const renderOrders = () => (
    <DataTable
      columns={columns}
      currentPage={currentPage}
      data={orders}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      pageSize={pageSize}
      server
      theme={theme}
      totalRows={totalRows}
    />
  )

  return (
    <Card className="border">
      <CardHeader className="d-flex justify-content-between px-1">
        <CardTitle tag="div">Outlet Orders</CardTitle>
        <div className="d-flex flex-row">
          <DatePicker
            selectsRange
            startDate={startDate}
            onChange={(update: any) => {
              setDateRange(update)
            }}
            endDate={endDate}
            className="form-control"
            placeholderText="select date range"
          />
          <Button color="primary" className="ml-1" onClick={handleSearch}>
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        {renderOrders()}
      </CardBody>
    </Card>
  )
}

export default Orders
