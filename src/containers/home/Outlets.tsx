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
import { OutletStats } from '@classes/index'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import homeActions from '@redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from '@core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getOutletStatRequest, setQueryParams, setActiveLink } = homeActions

const barColors = [
  '#28c76f',
  '#0090fe',
  '#7367f0',
  '#ea5455',
  '#00cfe8',
  '#ff9f43',
  '#28c76f',
  '#0090fe',
  '#7367f0',
  '#ea5455',
  '#00cfe8',
  '#ff9f43',
  '#28c76f',
  '#0090fe',
  '#7367f0',
  '#ea5455'
]

const Outlets = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [outlets, setOutlets] = useState<OutletStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getOutletStatRequest(params))
    dispatch(setActiveLink('outlets'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { outlets, loading } = store
    setOutlets(outlets)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getOutletStatRequest(params))
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
              <BarChart data={outlets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="Region" name="Region" />
                <YAxis dataKey="Total Outlets" name="Total Outlets" />
                <Tooltip />
                {loading ? (
                  renderLoader()
                ) : (
                  <Bar
                    dataKey="Total Outlets"
                    fillOpacity="0.5"
                    strokeWidth={1}
                  >
                    {outlets.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % 20]}
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

export default Outlets
