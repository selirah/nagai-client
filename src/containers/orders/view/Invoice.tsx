import React from 'react'
import { Order } from '@classes/index'
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap'

interface Props {
  order: Order | null
}

const Invoice: React.FC<Props> = (props) => {
  const { order } = props

  const cartTotalQty = order
    ? order.items.reduce((acc, data) => acc + data.quantity, 0)
    : 0

  const cartTotalAmount = order
    ? order.items.reduce((acc, data) => acc + data.unitPrice * data.quantity, 0)
    : 0

  const renderItems = () => (
    <table className="table cart-table mb-0">
      <thead>
        <tr>
          <th>Product</th>
          <th className="text-left">Name</th>
          <th>SKU</th>
          <th>Price (GHC)</th>
          <th>Qty</th>
          <th className="text-right">
            <span id="amount" className="amount">
              Total (GHC)
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {order &&
          order.items.map((ct, index) => (
            <tr key={index}>
              <td>
                <div className="product-img">
                  <img
                    src={
                      ct.product.avatar
                        ? ct.product.avatar
                        : require('@assets/images/icons/received.svg').default
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
              </td>
              <td>
                <div className="product-name text-left">
                  <p>{ct.product.productName.toUpperCase()}</p>
                </div>
              </td>
              <td>
                <div className="product-name text-left">
                  <p>{ct.sku}</p>
                </div>
              </td>
              <td>{ct.unitPrice}</td>
              <td>{ct.quantity}</td>
              <td className="text-right">
                {(ct.unitPrice * ct.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={4}>&nbsp;</th>
          <th>
            <span className="text-danger">{cartTotalQty}</span>
          </th>
          <th className="text-right">
            <span className="text-success">
              GHC {cartTotalAmount.toFixed(2)}
            </span>
          </th>
        </tr>
      </tfoot>
    </table>
  )

  const renderTaxes = () => (
    <table className="table cart-table mb-0">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Property</th>
          <th>Value (GHC)</th>
          <th className="text-right">
            <span id="amount" className="amount">
              Total (GHC)
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2}></td>
          <td>Order Total</td>
          <td>{order ? `${order.orderTotal}` : null}</td>
          <td className="text-right">{order ? `${order.orderTotal}` : null}</td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td>Discount</td>
          <td>
            {order ? `${parseFloat(order.invoice.discount).toFixed(2)}` : null}
          </td>
          <td className="text-right">
            {order
              ? `- ${parseFloat(order.invoice.discount).toFixed(2)}`
              : null}
          </td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td>Delivery Fee</td>
          <td>
            {order
              ? `${parseFloat(order.invoice.deliveryFee).toFixed(2)}`
              : null}
          </td>
          <td className="text-right">
            {order
              ? `+ ${parseFloat(order.invoice.deliveryFee).toFixed(2)}`
              : null}
          </td>
        </tr>
        {order &&
          order.invoice.taxes.map((t) => (
            <tr key={t.id}>
              <td colSpan={2}></td>
              <td>{t.tax}</td>
              <td>{`${parseFloat(t.rate) * 100}%`}</td>
              <td className="text-right">{`+ ${(
                parseFloat(t.rate) * cartTotalAmount
              ).toFixed(2)}`}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3}>&nbsp;</th>
          <th></th>
          <th className="text-right">
            <span className="text-success">
              GHC {order ? order.invoice.finalAmount : 0}
            </span>
          </th>
        </tr>
      </tfoot>
    </table>
  )

  return (
    <Card className="border product-card">
      <CardHeader className="d-flex justify-content-between px-1">
        <CardTitle tag="div">Invoice</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <hr className="m-0 mb-2" />
        <div>
          {renderItems()}
          {renderTaxes()}
        </div>
      </CardBody>
    </Card>
  )
}

export default Invoice
