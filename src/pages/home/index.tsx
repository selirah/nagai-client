import React, { useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import categoriesActions from 'redux/categories/actions'
import manufacturerActions from 'redux/manufacturers/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import { isEmpty } from 'utils'

const { getCategoriesRequest } = categoriesActions
const { getManufacturersRequest } = manufacturerActions

const Home = () => {
  const dispatch: Dispatch = useDispatch()
  const { categories } = Selector((state) => state.categories)
  const { manufacturers } = Selector((state) => state.manufacturers)

  useEffect(() => {
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    if (isEmpty(manufacturers)) {
      dispatch(getManufacturersRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="12" sm="12">
          <Card>
            <CardBody>
              <h4>Home</h4>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home
