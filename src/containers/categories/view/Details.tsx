import React from 'react'
import moment from 'moment'
import { Category } from '@classes/index'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from '@utils/index'

interface Props {
  category: Category | null
}
const Details: React.FC<Props> = (props) => {
  const { category } = props

  const renderAvatar = (category: Category) => {
    if (category) {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-info text-white`}
        >
          {getInitials(category.category.toUpperCase())}
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
            {category ? renderAvatar(category) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="info" pill>
          {category ? category.category.replace(/_/gi, ' ') : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Name of Category</h6>
            <h6 className="mb-0">
              {category ? category.category.toUpperCase() : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Number of products
            </h6>
            <h6 className="mb-0 text-right">
              {category ? category.products.length : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          <div className="mb-1">
            <h6 className="text-muted font-weight-bolder">Date added</h6>
            <h6 className="mb-0">
              {category
                ? moment(category.createdAt).format('MMM Do, YYYY')
                : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
      </CardBody>
    </Card>
  )
}

export default Details
