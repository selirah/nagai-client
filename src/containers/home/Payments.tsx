import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { PaymentStats } from 'classes'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import homeActions from 'redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from 'core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getPaymentStatRequest, setQueryParams, setActiveLink } = homeActions

const Payments = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [payments, setPayments] = useState<PaymentStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getPaymentStatRequest(params))
    dispatch(setActiveLink('payments'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { payments, loading } = store
    setPayments(payments)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getPaymentStatRequest(params))
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
              <AreaChart data={payments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />

                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7367f0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7367f0" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="Sale ID" />
                <YAxis unit="GHC" />
                <Tooltip />
                {loading ? (
                  renderLoader()
                ) : (
                  <Area
                    type="monotone"
                    dataKey="Total Payment"
                    stroke="#7367f0"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Payments
