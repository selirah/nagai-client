import { Fragment } from 'react'
import { Selector } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Details from './Details'
import Products from './Products'

const View = () => {
  const store = Selector((state) => state.categories)
  return (
    <Fragment>
      <div id="user-profile" className="mt-2">
        <section id="profile-info">
          <Row>
            <Col lg={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
              <Details category={store.category} />
            </Col>
            <Col lg={{ size: 7, order: 2 }} sm={{ size: 12 }} xs={{ order: 2 }}>
              <Products products={store.category!.products} />
            </Col>
          </Row>
        </section>
      </div>
    </Fragment>
  )
}

export default View
