import React, {
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  Fragment
} from 'react'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { StockTrail, Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap'
import Empty from 'components/Empty'
import productActions from 'redux/products/actions'
import Spinner from 'components/Spinner'
import PaginationComponent from 'components/Pagination'

const { getStockTrailsRequest, setStockTrailsParams } = productActions

interface Props {
  product: Product
}

const StockTrails: React.FC<Props> = (props) => {
  const { product } = props
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.products)
  const [loading, setLoading] = useState(false)
  const [stockTrails, setStockTrails] = useState<StockTrail[]>([])
  const [pageSize] = useState(store.stockTrailsParams.page)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const { stockTrailsParams } = store
    stockTrailsParams.skip = 0
    stockTrailsParams.id = product.id
    dispatch(getStockTrailsRequest(stockTrailsParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageClick = useCallback(
    (e: MouseEvent<HTMLElement>, index: number) => {
      e.preventDefault()
      setCurrentPage(index)
      const { stockTrailsParams } = store
      if (index > stockTrailsParams.skip) {
        stockTrailsParams.skip = stockTrailsParams.skip + pageSize
      } else if (index < stockTrailsParams.skip) {
        stockTrailsParams.skip = stockTrailsParams.skip - pageSize
      }
      dispatch(setStockTrailsParams(stockTrailsParams))
      dispatch(getStockTrailsRequest(stockTrailsParams))
    },
    [dispatch, pageSize, store]
  )

  useEffect(() => {
    const { stockTrails, loadStockTrails, stockTrailsCount, errors } = store
    setLoading(loadStockTrails)
    if (stockTrails.length) {
      setPageCount(Math.ceil(stockTrailsCount / pageSize))
    }
  }, [store, pageSize])

  const renderLoader = () => (
    <div className="mx-auto p-2 mt-5">
      <Spinner />
    </div>
  )
  const renderEmptyList = () => <Empty />

  const renderStockTrails = () => (
    <Table borderless responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>PID</th>
          <th>SKU</th>
          <th>Unit</th>
          <th>Price</th>
          <th>QTY</th>
          <th>AMT</th>
          <th>User</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {stockTrails.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.productId}</td>
            <td>{s.sku}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  const renderPagination = () => (
    <PaginationComponent
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      pageCount={pageCount}
    />
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Stock Trails</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          {loading ? (
            renderLoader()
          ) : !store.stockTrails.length ? (
            <Fragment>
              {renderStockTrails()}
              {renderPagination()}
            </Fragment>
          ) : (
            renderEmptyList()
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default StockTrails
