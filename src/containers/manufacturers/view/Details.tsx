import React from 'react'
import moment from 'moment'
import { Manufacturer } from 'classes'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from 'utils'

interface Props {
  manufacturer: Manufacturer | null
}

const Details: React.FC<Props> = (props) => {
  const { manufacturer } = props

  const renderAvatar = (manufacturer: Manufacturer) => {
    if (manufacturer && manufacturer.logo) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={manufacturer.logo}
          style={{ objectFit: 'cover', borderRadius: '100%' }}
          alt="Card"
        />
      )
    } else {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-light-info`}
        >
          {getInitials(manufacturer.name)}
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
            {manufacturer ? renderAvatar(manufacturer) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="primary" pill>
          {manufacturer ? manufacturer.name.replace(/_/gi, ' ') : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">
              Name of Manufacturer
            </h6>
            <h6 className="mb-0">
              {manufacturer ? manufacturer.name.toUpperCase() : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder">Location</h6>
            <h6 className="mb-0">
              {manufacturer ? manufacturer.location : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder">Phone</h6>
            <h6 className="mb-0">{manufacturer ? manufacturer.phone : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Date added</h6>
            <h6 className="mb-0">
              {manufacturer
                ? moment(manufacturer.createdAt).format('MMM Do, YYYY')
                : null}
            </h6>
          </div>
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">
              Number of products produced
            </h6>
            <h6 className="mb-0">
              {manufacturer ? manufacturer.products.length : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Latitude</h6>
            <h6 className="mb-0">
              {manufacturer ? manufacturer.coordinates.lat : null}
            </h6>
          </div>
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Longitude</h6>
            <h6 className="mb-0">
              {manufacturer ? manufacturer.coordinates.lng : null}
            </h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
