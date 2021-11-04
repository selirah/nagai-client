import React from 'react'
import { Outlet } from 'classes'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from 'utils/index'

interface Props {
  outlet: Outlet | null
}

const Details: React.FC<Props> = (props) => {
  const { outlet } = props

  const renderAvatar = (outlet: Outlet) => {
    if (outlet && outlet.photo) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={outlet.photo}
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
          {getInitials(outlet.outletName.toUpperCase())}
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
            {outlet ? renderAvatar(outlet) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="info" pill>
          {outlet ? `${outlet.outletName} (${outlet.ownerName})` : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Owner Name</h6>
            <h6 className="mb-0">
              {outlet ? outlet.ownerName.toUpperCase() : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Outlet Name
            </h6>
            <h6 className="mb-0 text-right">
              {outlet ? outlet.outletName.toUpperCase() : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Barcode</h6>
            <h6 className="mb-0">{outlet ? outlet.barcode : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">Mobile</h6>
            <h6 className="mb-0 text-right">{outlet ? outlet.mobile : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Tel</h6>
            <h6 className="mb-0">{outlet ? outlet.telephone : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">Email</h6>
            <h6 className="mb-0 text-right">{outlet ? outlet.email : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Locality</h6>
            <h6 className="mb-0">{outlet ? outlet.locality : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Sub-locality
            </h6>
            <h6 className="mb-0 text-right">
              {outlet ? outlet.subLocality : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Lat</h6>
            <h6 className="mb-0">{outlet ? outlet.coordinates.lat : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">Lng</h6>
            <h6 className="mb-0 text-right">
              {outlet ? outlet.coordinates.lng : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Region</h6>
            <h6 className="mb-0">{outlet ? outlet.region : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Landmark</h6>
            <h6 className="mb-0">{outlet ? outlet.landmark : null}</h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
