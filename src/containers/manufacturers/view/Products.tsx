import React from 'react'
import moment from 'moment'
import { Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap'
import { getCategory } from 'utils'

interface Props {
  products: Product[]
}

const Products: React.FC<Props> = (props) => {
  const { products } = props
  let count = 1

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ fontSize: '12px' }}>
                  <th scope="row">{count++}</th>
                  <td>{p.productName}</td>
                  <td>
                    {getCategory(p.categoryId)
                      ? getCategory(p.categoryId)?.category
                      : null}
                  </td>
                  <td>{moment(p.createdAt).format("MMM Do, 'YY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  )
}

export default Products
