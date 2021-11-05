import { useState, useEffect } from 'react'
import { Selector } from '@redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Details from './Details'
import MapLayout from './MapLayout'
import Products from './Products'

const View = () => {
  const store = Selector((state) => state.manufacturers)
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    setMode(layoutStore.mode)
  }, [layoutStore])

  return (
    <div id="user-profile" className="mt-2">
      <section id="profile-info">
        <Row>
          <Col lg={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <Details manufacturer={store.manufacturer} />
            <Products products={store.manufacturer!.products} theme={mode} />
          </Col>
          <Col lg={{ size: 7, order: 2 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <MapLayout manufacturer={store.manufacturer!} mode={mode} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
