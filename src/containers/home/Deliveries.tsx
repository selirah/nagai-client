import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend
} from 'recharts'
import { DeliveryStats } from 'classes'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import homeActions from 'redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from 'core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getDeliveryStatRequest, setQueryParams, setActiveLink } = homeActions

const Deliveries = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  // const today = new Date()
  // let tomorrow = new Date()
  // tomorrow.setDate(today.getDate() + 1)
  const [deliveries, setDeliveries] = useState<DeliveryStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getDeliveryStatRequest(params))
    dispatch(setActiveLink('deliveries'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { deliveries, loading } = store
    setDeliveries(deliveries)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getDeliveryStatRequest(params))
  }, [dispatch, store, startDate, endDate])

  const deliveredColors = (delivered: string) => {
    switch (delivered) {
      case 'DELIVERED':
        return '#28c76f'
      case 'NOT DELIVERED':
        return '#ea5455'
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
              <PieChart width={730} height={250}>
                <Tooltip />
                <Legend />
                {loading ? (
                  renderLoader()
                ) : (
                  <Pie
                    data={deliveries}
                    dataKey="count"
                    nameKey="delivered"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fillOpacity="0.7"
                    label
                  >
                    {deliveries.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={deliveredColors(entry.delivered)}
                      />
                    ))}
                  </Pie>
                )}
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Deliveries
