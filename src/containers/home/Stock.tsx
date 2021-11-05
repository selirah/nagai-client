import { useState, useEffect, useCallback, Fragment } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import {
  ComposedChart,
  Bar,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { StockStats } from '@classes/index'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import homeActions from '@redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from '@core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getStockStatRequest, setQueryParams, setActiveLink } = homeActions

const Stock = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [stock, setStock] = useState<StockStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getStockStatRequest(params))
    dispatch(setActiveLink('stock'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { stock, loading } = store
    setStock(stock)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getStockStatRequest(params))
  }, [dispatch, store, startDate, endDate])

  const renderLoader = () => (
    <div className="mt-5 text-primary">
      <PuffLoader color="#0090fe" />
    </div>
  )

  return (
    <Row className="match-height">
      <Col lg="12" sm="12" md="12" className="mb-2">
        <div className="d-flex align-content-center justify-content-around w-100">
          <DatePicker
            selectsRange
            startDate={startDate}
            onChange={(update: any) => {
              setDateRange(update)
            }}
            endDate={endDate}
            className="form-control border"
            placeholderText="select date range"
          />
          <RippleButton color="primary" className="ml-1" onClick={handleSearch}>
            Filter
          </RippleButton>
        </div>
      </Col>

      <Col lg="12" sm="12" md="12">
        <Card className="question">
          <CardBody className="question-container">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stock}>
                <XAxis dataKey="Product ID" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                {loading ? (
                  renderLoader()
                ) : (
                  <Fragment>
                    <Area
                      type="monotone"
                      dataKey="Stock Quantity"
                      fill="#0090fe"
                      stroke="#0090fe"
                      fillOpacity="0.3"
                    />
                    <Bar
                      dataKey="Stock Value"
                      barSize={20}
                      fill="#7367f0"
                      fillOpacity="0.5"
                      stroke="#7367f0"
                    />
                    <Line
                      type="monotone"
                      dataKey="Reorder Quantity"
                      stroke="#ff9f43"
                    />
                  </Fragment>
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Stock
