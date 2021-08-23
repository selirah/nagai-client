import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { StockTrail, Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import productActions from 'redux/products/actions'
import { IDataTableColumn } from 'react-data-table-component'
import DataTable from 'components/DataTable'
import moment from 'moment'

const { getStockTrailsRequest, setStockTrailsParams } = productActions

interface Props {
  product: Product
  theme: string
}

const StockTrails: React.FC<Props> = (props) => {
  const { product, theme } = props
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const [stockTrails, setStockTrails] = useState<StockTrail[]>([])
  const [pageSize, setPageSize] = useState(store.stockTrailsParams.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRows, setTotalRows] = useState(store.stockTrailsCount)

  useEffect(() => {
    const { stockTrailsParams } = store
    stockTrailsParams.skip = 0
    stockTrailsParams.id = product.id
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
      <CardHeader>
        <CardTitle>Stock Trails</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        {renderStockTrails()}
      </CardBody>
    </Card>
  )
}

export default StockTrails
