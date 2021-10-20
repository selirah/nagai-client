import React, { useMemo } from 'react'
import { Payment } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'
import moment from 'moment'

interface Props {
  payments: Payment[]
  theme: string
}

const Payments: React.FC<Props> = (props) => {
  const { payments, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Sale ID',
        sortable: true,
        selector: (row: Payment) => row.saleId
      },
      {
        id: 2,
        name: 'Amount',
        sortable: true,
        selector: (row: Payment) => `GHC ${row.amount}`
      },
      {
        id: 3,
        name: 'Payer',
        sortable: true,
        selector: (row: Payment) => row.payer.toUpperCase()
      },
      {
        id: 4,
        name: 'Phone',
        sortable: true,
        selector: (row: Payment) => row.payerPhone
      },
      {
        id: 5,
        name: 'Payee',
        sortable: true,
        selector: (row: Payment) =>
          `${row.payee.firstName.toUpperCase()} ${row.payee.lastName.toUpperCase()}`
      },
      {
        id: 6,
        name: 'Created Date',
        sortable: true,
        selector: (row: Payment) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable columns={columns} data={payments} theme={theme} />
      </CardBody>
    </Card>
  )
}

export default Payments
