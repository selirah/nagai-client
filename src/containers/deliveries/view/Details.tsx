import React from 'react'
import { DBUser, Tracking as Track } from 'classes'
import { getInitials } from 'utils/index'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'

interface Props {
  tracking: Track
}

const Details: React.FC<Props> = (props) => {
  const { tracking } = props

  const renderAvatar = (dispatch: DBUser) => {
    if (dispatch && dispatch.avatar) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={dispatch.avatar}
          style={{ objectFit: 'cover', borderRadius: '100%' }}
          alt="Card"
        />
      )
    } else {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-light-primary`}
        >
          {getInitials(
            `${dispatch.firstName.toUpperCase()} ${dispatch.lastName.toUpperCase()}`
          )}
        </div>
      )
    }
  }

  return (
    <Card className="card-profile border">
      <CardHeader>
        <hr className="mb-2" />
      </CardHeader>
      <CardBody>
        <div className="profile-image-wrapper mb-3">
          <div
            className="profile-image"
            style={{ width: '150px', height: '150px', overflow: 'hidden' }}
          >
            {renderAvatar(tracking.delivery.dispatch)}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="primary" pill>
          {`${tracking.delivery.dispatch.firstName.toUpperCase()} ${tracking.delivery.dispatch.lastName.toUpperCase()}`}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Phone</h6>
            <h6 className="mb-0">{tracking.delivery.dispatch.phone}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">Email</h6>
            <h6 className="mb-0 text-right">
              {tracking.delivery.dispatch.email}
            </h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
