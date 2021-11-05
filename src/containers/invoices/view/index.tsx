import { Selector } from '@redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Invoice from './Invoice'

const View = () => {
  const store = Selector((state) => state.invoices)

  return (
    <div id="user-profile" className="mt-2">
      <section id="profile-info">
        <Row className="d-flex justify-content-center">
          <Col lg={{ size: 8, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <Invoice invoice={store.invoice} />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default View
