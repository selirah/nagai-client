import { useState, useEffect } from 'react'
import { Selector } from '@redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Outlets from './Outlets'

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
          <Col lg={{ size: 12, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <Outlets outlets={store.territory!.outlets} theme={mode} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
