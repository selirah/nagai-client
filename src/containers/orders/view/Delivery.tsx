import React from 'react'
import { Delivery } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import EmptyTruck from 'components/EmptyTruck'

interface Props {
  delivery: Delivery | null
}

const DeliveryStatus: React.FC<Props> = (props) => {
  const { delivery } = props

  const renderEmptyTruck = () => <EmptyTruck />

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Delivery Status</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          {delivery ? <h1>Huray</h1> : renderEmptyTruck()}
        </div>
      </CardBody>
    </Card>
  )
}

export default DeliveryStatus
