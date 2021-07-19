import React, { Fragment, useState } from 'react'
import { Manufacturer } from 'classes'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Details from './Details'
import MapLayout from './MapLayout'

const View = () => {
  const store = Selector((state) => state.manufacturers)
  return (
    <Fragment>
      <div id="user-profile" className="mt-2">
        <section id="profile-info">
          <Row>
            <Col lg={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
              <Details manufacturer={store.manufacturer} />
            </Col>
            <Col lg={{ size: 7, order: 2 }} sm={{ size: 12 }} xs={{ order: 2 }}>
              <MapLayout manufacturer={store.manufacturer!} />
            </Col>
          </Row>
        </section>
      </div>
    </Fragment>
  )
}

export default View
