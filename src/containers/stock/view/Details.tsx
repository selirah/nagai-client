import React from 'react'
import moment from 'moment'
import { Stock, Product } from 'classes'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from 'utils'

interface Props {
  stock: Stock | null
}

const Details: React.FC<Props> = (props) => {
  const { stock } = props

  const renderAvatar = (product: Product) => {
    if (product) {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-info text-white`}
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
            {stock ? renderAvatar(stock.product) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="info" pill>
          {stock ? `${stock.id} (${stock.sku})` : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Product ID</h6>
            <h6 className="mb-0">{stock ? stock.productId : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Name of Product
            </h6>
            <h6 className="mb-0 text-right">
              {stock ? stock.product.productName.toUpperCase() : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Stock ID</h6>
            <h6 className="mb-0">{stock ? stock.id : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">SKU</h6>
            <h6 className="mb-0 text-right">{stock ? stock.sku : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Unit Price</h6>
            <h6 className="mb-0">{stock ? `GHC ${stock.unitPrice}` : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Quantity Purchased
            </h6>
            <h6 className="mb-0 text-right">
              {stock ? `${stock.quantityPurchased} ${stock.unit}` : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Quantity in Stock</h6>
            <h6 className="mb-0">
              {stock ? `${stock.quantityInStock} ${stock.unit}` : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Stock Value
            </h6>
            <h6 className="mb-0 text-right">
              {stock ? `GHC ${stock.stockValue}` : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Reorder Level</h6>
            <h6 className="mb-0">
              {stock ? `${stock.reorderLevel} ${stock.unit}` : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Reorder Quantity
            </h6>
            <h6 className="mb-0 text-right">
              {stock ? `${stock.reorderQuantity} ${stock.unit}` : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Reorder Date</h6>
            <h6 className="mb-0">
              {stock ? moment(stock.reorderDate).format('MMM Do, YYYY') : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Date Updated
            </h6>
            <h6 className="mb-0 text-right">
              {stock
                ? moment(stock.updatedAt).format('MMM Do, YYYY, h:mm a')
                : null}
            </h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
