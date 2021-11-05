import React from 'react'
import { Invoice } from '@classes/index'
import { numberWithCommas } from '@utils/index'
import moment from 'moment'

interface Props {
  invoice: Invoice
}

const InvoiceView: React.FC<Props> = (props) => {
  const { invoice } = props

  const cartTotalAmount = invoice
    ? invoice.order.items.reduce(
        (acc, data) => acc + data.unitPrice * data.quantity,
        0
      )
    : 0

  return (
    <div className="container-alt">
      <table width="100%">
        <tr>
          <td width="300px">
            <div
              style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-1px',
                height: '73px',
                lineHeight: '75px'
              }}
              className="text-primary"
            >
              Invoice
            </div>
          </td>
          <td></td>
        </tr>
      </table>
      <table
        width="100%"
        style={{ borderCollapse: 'collapse' }}
        className="border"
      >
        <tr>
          <td width="50%" style={{ padding: '20px' }}>
            <strong>Invoice Number:</strong> {invoice.id}
            <br />
            <br />
            <strong>Date:</strong>{' '}
            {moment(invoice.createdAt).format('YYYY/MM/DD')}
            <br />
            <br />
            <strong>Order Number:</strong> {invoice.orderId}
            <br />
            <br />
          </td>
          <td style={{ padding: '20px' }}>
            <strong>Billed To:</strong> {invoice.outlet.ownerName.toUpperCase()}
            <br />
            <br />
            <strong>Of:</strong> {invoice.outlet.outletName.toUpperCase()}
            <br />
            <br />
            <strong>Phone:</strong> {invoice.outlet.mobile}
            <br />
            <br />
          </td>
        </tr>
      </table>
      <br />
      <table width="100%">
        <tr>
          <td>
            <table>
              <tr>
                <td>
                  <strong className="text-primary">Delivery Details</strong>
                  <br />
                  {invoice.outlet.ownerName.toUpperCase()}
                  <br />
                  {invoice.outlet.outletName.toUpperCase()}
                  <br />
                  {invoice.outlet.subLocality.toUpperCase()},{' '}
                  {invoice.outlet.locality.toUpperCase()}
                  <br />
                  {invoice.outlet.region.toUpperCase()} REGION
                  <br />
                  {invoice.outlet.mobile}
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table>
              <tr>
                <td
                  style={{
                    verticalAlign: 'text-top',
                    fontSize: '20px'
                  }}
                  className="font-weight-bold"
                >
                  Invoice Total:{' '}
                  <span className="text-danger font-weight-bolder">
                    GHC {numberWithCommas(invoice.finalAmount)}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <br />
      <table width="100%" className="border-top border-bottom">
        <tr>
          <td>
            <h4 className="py-2 text-primary">Checkout Details</h4>
          </td>
        </tr>
      </table>
      <br />
      <table
        width="100%"
        style={{ borderCollapse: 'collapse', borderBottom: '1px solid #eee' }}
      >
        <tr>
          <td width="40%" className="column-header font-weight-bold">
            Product
          </td>
          <td
            width="15%"
            className="column-header font-weight-bold text-center"
          >
            Unit
          </td>
          <td
            width="15%"
            className="column-header font-weight-bold text-center"
          >
            Price (GHC)
          </td>
          <td
            width="10%"
            className="column-header font-weight-bold text-center"
          >
            Qty
          </td>
          <td
            width="20%"
            className="column-header font-weight-bold text-center"
          >
            Total (GHC)
          </td>
        </tr>
        {invoice.order.items.map((item, index) => (
          <tr key={index}>
            <td className="row-alt">
              <span style={{ color: '#777', fontSize: '11px' }}>
                #{item.sku}
              </span>
              <br />
              {item.product.productName.toUpperCase()}
            </td>
            <td className="row-alt text-center">{item.unit.toUpperCase()}</td>
            <td className="row-alt text-center">{item.unitPrice}</td>
            <td className="row-alt text-center">{item.quantity}</td>
            <td className="row-alt text-center">
              {(item.unitPrice * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </table>
      <br />
      <table width="100%" style={{ padding: '20px' }}>
        <tr>
          <td>
            <table width="300px" style={{ float: 'right' }}>
              <tr>
                <td>
                  <strong>Sub-total:</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  GHC {cartTotalAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Discount:</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  GHS {parseFloat(invoice.discount).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Delivery fee:</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  GHS {parseFloat(invoice.deliveryFee).toFixed(2)}
                </td>
              </tr>
              {invoice.taxes.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>
                      {`${t.tax} (${parseFloat(t.rate) * 100}%)`}:
                    </strong>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    GHC {`${(parseFloat(t.rate) * cartTotalAmount).toFixed(2)}`}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>GRAND TOTAL:</strong>
                </td>
                <td
                  style={{ textAlign: 'right' }}
                  className="text-danger font-weight-bolder"
                >
                  GHC {invoice.finalAmount}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <hr className="mb-2" />
      <div className="alert-alt">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      </div>
      <hr className="mb-2" />
      <div className="socialmedia">
        <small> COPYRIGHT © {new Date().getFullYear()} NAGAI CONSULT </small>
      </div>
    </div>
  )
}

export default InvoiceView
