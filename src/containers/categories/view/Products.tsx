import React from 'react'
import moment from 'moment'
import { Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap'
import Empty from 'components/Empty'

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
        {products.length ? (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <th scope="row">{count++}</th>
                  <td>{p.id}</td>
                  <td>{p.productName.toUpperCase()}</td>
                  <td>{moment(p.createdAt).format("MMM Do, 'YY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Empty />
        )}
      </CardBody>
    </Card>
  )
}

export default Products
