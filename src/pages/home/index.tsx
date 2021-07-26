import React, { useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import categoriesActions from 'redux/categories/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import { isEmpty } from 'utils'

const { getCategoriesRequest } = categoriesActions

const Home = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.categories)

  useEffect(() => {
    const { categories } = store
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
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
