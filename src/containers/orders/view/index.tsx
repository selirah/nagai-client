import { useState, useEffect } from 'react'
import { Selector } from '@redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Invoice from './Invoice'
import Location from './Location'

const View = () => {
  const store = Selector((state) => state.orders)
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    setMode(layoutStore.mode)
  }, [layoutStore])

  return (
    <div id="user-profile" className="mt-2">
      <section id="profile-info">
        <Row>
          <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <Invoice order={store.order} />
          </Col>
          <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <Location outlet={store.order!.outlet} theme={mode} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
