import React, { Fragment, useEffect, useState } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import { Tracking as Track } from '@classes/index'
import { useDispatch } from 'react-redux'
import Tracking from './Tracking'
import deliveryActions from '@redux/deliveries/actions'
import { PuffLoader } from 'react-spinners'
import Empty from '@components/EmptyBox'
import Details from './Details'
import Outlet from './Outlet'

const { getTrackingRequest } = deliveryActions

interface Props {
  onLoadMap: (map: any) => void
  mapRef: any
}

const View: React.FC<Props> = (props) => {
  const { onLoadMap, mapRef } = props
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.deliveries)
  const layoutStore = Selector((state) => state.layout)
  const [tracking, setTracking] = useState<Track | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    const { delivery } = store
    dispatch(getTrackingRequest(delivery!.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { tracking, loadTracking } = store
    const { mode } = layoutStore
    setLoading(loadTracking)
    setTracking(tracking)
    setMode(mode)
  }, [store, layoutStore])

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
        <Outlet outlet={tracking!.outlet} />
      </Col>
      <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
        <Tracking
          tracking={tracking!}
          mode={mode}
          onLoadMap={onLoadMap}
          mapRef={mapRef}
        />
      </Col>
    </Fragment>
  )

  return (
    <div id="user-profile" className="mt-2">
      <section id="profile-info">
        <Row className="d-flex justify-content-center">
          {loading
            ? renderLoader()
            : !loading && tracking
            ? renderTracking()
            : renderEmpty()}
        </Row>
      </section>
    </div>
  )
}

export default View
