import { useState, useCallback, MouseEvent, Fragment } from 'react'
import { Selector } from 'redux/selector-dispatch'
import { Row, Col } from 'reactstrap'
import Details from './Details'
import Products from './Products'

const View = () => {
  const store = Selector((state) => state.categories)
  const [pageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount] = useState(
    Math.ceil(store.category ? store.category.products.length / pageSize : 0)
  )

  const handlePageClick = useCallback(
    (e: MouseEvent<HTMLElement>, index: number) => {
      e.preventDefault()
      setCurrentPage(index)
    },
    []
  )

  return (
    <Fragment>
      <div id="user-profile" className="mt-2">
        <section id="profile-info">
          <Row>
            <Col lg={{ size: 5, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
              <Details category={store.category} />
            </Col>
            <Col lg={{ size: 7, order: 2 }} sm={{ size: 12 }} xs={{ order: 2 }}>
              <Products
                products={store.category!.products}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                pageSize={pageSize}
              />
            </Col>
          </Row>
        </section>
      </div>
    </Fragment>
  )
}

export default View
