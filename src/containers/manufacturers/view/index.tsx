import { Fragment } from 'react'
import { Selector } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Details from './Details'
import MapLayout from './MapLayout'
import Products from './Products'

const View = () => {
  const store = Selector((state) => state.manufacturers)
  return (
    <Fragment>
      <div id="user-profile" className="mt-2">
        <section id="profile-info">
          <Row>
            <Col lg={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
              <Details manufacturer={store.manufacturer} />
              {store.manufacturer && store.manufacturer.products.length ? (
                <Products products={store.manufacturer!.products} />
              ) : null}
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
