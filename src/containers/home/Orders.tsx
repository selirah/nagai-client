import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from 'recharts'
import { OrderStats } from 'classes'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import homeActions from 'redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from 'core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getOrderStatRequest, setQueryParams, setActiveLink } = homeActions

const Orders = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  // const today = new Date()
  // let tomorrow = new Date()
  // tomorrow.setDate(today.getDate() + 1)
  const [orders, setOrders] = useState<OrderStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getOrderStatRequest(params))
    dispatch(setActiveLink('orders'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { orders, loading } = store
    setOrders(orders)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getOrderStatRequest(params))
  }, [dispatch, store, startDate, endDate])

  const statusColors = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return '#28c76f'
      case 'PENDING':
        return '#0090fe'
      case 'TRANSIT':
        return '#7367f0'
      case 'FAILED':
        return '#ea5455'
      case 'DISPATCH':
        return '#00cfe8'
    }
  }

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
              <BarChart data={orders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis
                  dataKey="status"
                  interval="preserveEnd"
                  stroke="#636363"
                />
                <YAxis
                  interval="preserveEnd"
                  stroke="#636363"
                  dataKey="count"
                />
                <Tooltip
                  wrapperStyle={{ backgroundColor: '#eee' }}
                  formatter={function (total) {
                    return `${total}`
                  }}
                />
                {loading ? (
                  renderLoader()
                ) : (
                  <Bar dataKey="count" fillOpacity="0.3" strokeWidth={1}>
                    {orders.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={statusColors(entry.status)}
                      />
                    ))}
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Orders
