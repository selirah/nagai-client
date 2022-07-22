import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { StockTrail, Stock } from '@classes/index'
import { Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap'
import stockActions from '@redux/stock/actions'
import { IDataTableColumn } from 'react-data-table-component'
import DataTable from '@components/DataTable'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const { getStockTrailsRequest, setStockTrailsParams } = stockActions

interface Props {
  stock: Stock
  theme: string
}

const StockTrails: React.FC<Props> = (props) => {
  const { stock, theme } = props
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.stock)
  const [loading, setLoading] = useState(false)
  const [stockTrails, setStockTrails] = useState<StockTrail[]>([])
  const [pageSize, setPageSize] = useState(store.stockTrailsParams.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRows, setTotalRows] = useState(store.stockTrailsCount)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    const { stockTrailsParams } = store
    stockTrailsParams.skip = 0
    stockTrailsParams.id = stock.id
    dispatch(getStockTrailsRequest(stockTrailsParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Stock ID',
        sortable: true,
        selector: (row: StockTrail) => row.stockId
      },
      {
        id: 2,
        name: 'Product ID',
        sortable: true,
        selector: (row: StockTrail) => row.productId
      },
      {
        id: 3,
        name: 'SKU',
        sortable: true,
        selector: (row: StockTrail) => row.sku
      },
      {
        id: 4,
        name: 'Unit Price',
        sortable: true,
        selector: (row: StockTrail) => `GHC ${row.unitPrice}`
      },
      {
        id: 5,
        name: 'Quantity Purchased',
        sortable: true,
        selector: (row: StockTrail) => `${row.quantityPurchased} ${row.unit}`
      },
      {
        id: 6,
        name: 'Entered by',
        sortable: true,
        selector: (row: StockTrail) =>
          `${row.user.firstName} ${row.user.lastName}`
      },
      {
        id: 7,
        name: 'Created Date',
        sortable: true,
        selector: (row: StockTrail) =>
          moment(row.createdAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  useEffect(() => {
    const { stockTrails, loadStockTrails, stockTrailsCount } = store
    setLoading(loadStockTrails)
    if (stockTrails.length) {
      setStockTrails(stockTrails)
      setTotalRows(stockTrailsCount)
    } else {
      setStockTrails(stockTrails)
    }
  }, [store, pageSize])

  const handlePageClick = useCallback(
    (page: number) => {
      const { stockTrailsParams } = store
      if (page > currentPage) {
        stockTrailsParams.skip = stockTrailsParams.skip + pageSize
      } else if (page < currentPage) {
        stockTrailsParams.skip = stockTrailsParams.skip - pageSize
      }
      setCurrentPage(page)
      dispatch(setStockTrailsParams(stockTrailsParams))
      dispatch(getStockTrailsRequest(stockTrailsParams))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { stockTrailsParams } = store
      stockTrailsParams.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getStockTrailsRequest(stockTrailsParams))
    },
    [dispatch, store]
  )

  const handleSearch = useCallback(() => {
    const { stockTrailsParams } = store
    stockTrailsParams.skip = 0
    stockTrailsParams.fromDate = startDate
      ? new Date(startDate).toISOString()
      : ''
    stockTrailsParams.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getStockTrailsRequest(stockTrailsParams))
  }, [dispatch, store, startDate, endDate])

  const renderStockTrails = () => (
    <DataTable
      columns={columns}
      currentPage={currentPage}
      data={stockTrails}
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
        <CardTitle tag="div">Stock Trails</CardTitle>
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
        {renderStockTrails()}
      </CardBody>
    </Card>
  )
}

export default StockTrails
