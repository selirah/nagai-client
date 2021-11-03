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
import { ManufacturerStats } from 'classes'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import homeActions from 'redux/home/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import RippleButton from 'core/components/ripple-button'
import { PuffLoader } from 'react-spinners'

const { getManuStatRequest, setQueryParams, setActiveLink } = homeActions

const Manufacturers = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.home)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [manufacturers, setManufacturers] = useState<ManufacturerStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { params } = store
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getManuStatRequest(params))
    dispatch(setActiveLink('manufacturers'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { manufacturers, loading } = store
    setManufacturers(manufacturers)
    setLoading(loading)
  }, [store])

  const handleSearch = useCallback(() => {
    const { params } = store
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getManuStatRequest(params))
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
              <AreaChart data={manufacturers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="Manufacturer" name="Manufacturer" />
                <YAxis dataKey="Product Count" name="Total Outlets" />
                <Tooltip />
                {loading ? (
                  renderLoader()
                ) : (
                  <Area
                    type="monotone"
                    dataKey="Product Count"
                    fill="#7367f0"
                    stroke="#7367f0"
                    fillOpacity="0.4"
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

export default Manufacturers
