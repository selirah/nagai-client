import React, { useMemo } from 'react'
import { Stock } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

interface Props {
  stock: Stock[]
  theme: string
}

const StockList: React.FC<Props> = (props) => {
  const { stock, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'SKU',
        sortable: true,
        selector: (row: Stock) => row.id
      },
      {
        id: 2,
        name: 'Unit Price',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.unitPrice}`
      },
      {
        id: 3,
        name: 'Quantity in Stock',
        sortable: true,
        selector: (row: Stock) => `${row.quantityInStock} ${row.unit}`
      },
      {
        id: 4,
        name: 'Stock Value',
        sortable: true,
        selector: (row: Stock) => `GHC ${row.stockValue}`
      },
      {
        id: 5,
        name: 'Reorder Level',
        sortable: true,
        selector: (row: Stock) => `${row.reorderLevel} ${row.unit}`
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable columns={columns} data={stock} theme={theme} />
      </CardBody>
    </Card>
  )
}

export default StockList
