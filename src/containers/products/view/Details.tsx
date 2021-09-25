import React from 'react'
import moment from 'moment'
import { Product } from 'classes'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from 'utils'

interface Props {
  product: Product | null
}

const Details: React.FC<Props> = (props) => {
  const { product } = props

  const renderAvatar = (product: Product) => {
    if (product && product.avatar) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={product.avatar}
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
          {getInitials(product.productName.toUpperCase())}
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
            {product ? renderAvatar(product) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="primary" pill>
          {product ? product.productName.replace(/_/gi, ' ') : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Product ID</h6>
            <h6 className="mb-0">{product ? product.id : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder">Name of Product</h6>
            <h6 className="mb-0">
              {product ? product.productName.toUpperCase() : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder">Category</h6>
            <h6 className="mb-0">
              {product ? product.category.category.toUpperCase() : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Date added</h6>
            <h6 className="mb-0">
              {product
                ? moment(product.createdAt).format('MMM Do, YYYY')
                : null}
            </h6>
          </div>
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Manufacturer</h6>
            <h6 className="mb-0">
              {product ? product.manufacturer.name.toUpperCase() : null}
            </h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
