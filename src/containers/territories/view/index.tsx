import { useState, useEffect } from 'react'
import { Selector } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Agents from './Agents'
import Outlets from './Outlets'
import Location from './Location'

const View = () => {
  const store = Selector((state) => state.territories)
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
            <Agents agents={store.territory!.users} theme={mode} />
            <Outlets outlets={store.territory!.outlets} theme={mode} />
          </Col>
          <Col lg={{ size: 6, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <Location territory={store.territory!} theme={mode} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
