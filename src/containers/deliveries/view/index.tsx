import { Fragment, useEffect, useState } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import { Tracking as Track } from 'classes'
import { useDispatch } from 'react-redux'
import Tracking from './Tracking'
import deliveryActions from 'redux/deliveries/actions'
import { PuffLoader } from 'react-spinners'
import Empty from 'components/EmptyBox'
import Details from './Details'

const { getTrackingRequest } = deliveryActions

const View = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.deliveries)
  const [tracking, setTracking] = useState<Track | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { delivery } = store
    dispatch(getTrackingRequest(delivery!.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { tracking, loadTracking } = store
    setLoading(loadTracking)
    setTracking(tracking)
  }, [store])

  const renderLoader = () => (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <PuffLoader color="#0090fe" />
    </div>
  )

  const renderEmpty = () => (
    <div className="d-flex h-100 justify-content-center align-items-center">
      <Empty />
    </div>
  )

  const renderTracking = () => (
    <Fragment>
      <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
        <Details tracking={tracking!} />
      </Col>
      <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
        <Tracking tracking={tracking!} />
      </Col>
    </Fragment>
  )

  return (
    <div id="user-profile" className="mt-2">
      <section id="profile-info">
        <Row className="d-flex justify-content-center">
          <Col lg={{ size: 12, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            {loading
              ? renderLoader()
              : renderTracking()
              ? renderTracking()
              : renderEmpty()}
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
