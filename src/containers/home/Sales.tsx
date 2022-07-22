import { useState, useEffect, useCallback, Fragment } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { SaleStats } from '@classes/index'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import homeActions from '@redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from '@core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getSaleStatRequest, setQueryParams, setActiveLink } = homeActions

const Sales = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [sales, setSales] = useState<SaleStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getSaleStatRequest(params))
    dispatch(setActiveLink('sales'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { sales, loading } = store
    setSales(sales)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getSaleStatRequest(params))
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
              <BarChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis
                  dataKey="Amount Category"
                  interval="preserveEnd"
                  stroke="#636363"
                  label="Amount Type"
                />
                <YAxis interval="preserveEnd" stroke="#636363" unit="GHC" />
                <Tooltip
                  wrapperStyle={{ backgroundColor: '#eee' }}
                  formatter={function (total) {
                    return `${total}`
                  }}
                />
                {loading ? (
                  renderLoader()
                ) : (
                  <Fragment>
                    <Bar
                      dataKey="Total Amount"
                      fillOpacity="0.5"
                      strokeWidth={1}
                      fill="#7367f0"
                    />
                    <Bar
                      dataKey="Amount Paid"
                      fillOpacity="0.5"
                      strokeWidth={1}
                      fill="#28c76f"
                    />
                    <Bar
                      dataKey="Amount Left"
                      fillOpacity="0.5"
                      strokeWidth={1}
                      fill="#ea5455"
                    />
                  </Fragment>
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Sales
