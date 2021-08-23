import React, { useMemo } from 'react'
import moment from 'moment'
import { Product } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

interface Props {
  products: Product[]
  theme: string
}

const Products: React.FC<Props> = (props) => {
  const { products, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'SKU',
        sortable: true,
        selector: (row: Product) => row.id
      },
      {
        id: 2,
        name: 'Name',
        sortable: true,
        selector: (row: Product) => `GHC ${row.productName}`
      },
      {
        id: 3,
        name: 'Date Created',
        sortable: true,
        selector: (row: Product) => moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 3,
        name: 'Date Updated',
        sortable: true,
        selector: (row: Product) => moment(row.updatedAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable columns={columns} data={products} theme={theme} />
      </CardBody>
    </Card>
  )
}

export default Products
