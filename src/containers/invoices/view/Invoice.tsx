import React from 'react'
import { Invoice } from '@classes/index'
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap'
import InvoiceView from './InvoiceView'

interface Props {
  invoice: Invoice | null
}

const InvoiceDetails: React.FC<Props> = (props) => {
  const { invoice } = props

  return (
    <Card className="border">
      <CardHeader className="d-flex justify-content-between px-1">
        <CardTitle tag="div">Invoice</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <hr className="m-0 mb-2" />
        <div>
          <InvoiceView invoice={invoice!} />
        </div>
      </CardBody>
    </Card>
  )
}

export default InvoiceDetails
