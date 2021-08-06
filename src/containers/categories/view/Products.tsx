import React, { Fragment, MouseEvent } from 'react'
import moment from 'moment'
import { Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap'
import Empty from 'components/Empty'
import PaginationComponent from 'components/Pagination'

interface Props {
  products: Product[]
  pageCount: number
  currentPage: number
  handlePageClick: (e: MouseEvent<HTMLElement>, i: number) => void
  pageSize: number
}

const Products: React.FC<Props> = (props) => {
  const { products, currentPage, handlePageClick, pageCount, pageSize } = props
  let count = 1

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardBody>
        {products.length ? (
          <Fragment>
            <Table borderless responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((p) => (
                    <tr key={p.id}>
                      <th scope="row">{count++}</th>
                      <td>{p.id}</td>
                      <td>{p.productName.toUpperCase()}</td>
                      <td>{moment(p.createdAt).format("MMM Do, 'YY")}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <PaginationComponent
              currentPage={currentPage}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </Fragment>
        ) : (
          <Empty />
        )}
      </CardBody>
    </Card>
  )
}

export default Products
