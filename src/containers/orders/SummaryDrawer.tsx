import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { ShoppingBag, X } from 'react-feather'
import RippleButton from 'core/components/ripple-button'
import {
  Modal,
  ModalBody,
  Row,
  Col,
  Alert,
  Collapse,
  Spinner
} from 'reactstrap'
import { InvoiceFields, OrderFields, SaleFields } from 'classes'
import EmptyCart from 'components/EmptyCart'
import orderActions from 'redux/orders/actions'
import invoiceActions from 'redux/invoices/actions'
import stockActions from 'redux/stock/actions'
import saleActions from 'redux/sales/actions'
import { useHistory } from 'react-router-dom'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'

interface Props {
  toggleDrawer: boolean
  handleToggleDrawer: () => void
  order: OrderFields | null
  invoice: InvoiceFields | null
  sale: SaleFields | null
}

const { addOrderRequest, clearCart } = orderActions
const { addInvoiceRequest } = invoiceActions
const { addSaleRequest, clearStates } = saleActions
const { clearProductStock } = stockActions

const ModalHeader: React.FC<{ handleToggleDrawer: () => void }> = (props) => {
  const { handleToggleDrawer, children } = props
  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <span className="todo-item-favorite cursor-pointer mx-75"></span>
        <RippleButton color="danger" onClick={handleToggleDrawer}>
          Close <X className="font-weight-normal ml-2" size={12} />
        </RippleButton>
      </div>
    </div>
  )
}

const SummaryDrawer: React.FC<Props> = (props) => {
  const { handleToggleDrawer, toggleDrawer, order, invoice, sale } = props
  const dispatch: Dispatch = useDispatch()
  const orderStore = Selector((state) => state.orders)
  const invoiceStore = Selector((state) => state.invoices)
  const saleStore = Selector((state) => state.sales)
  const [err, setErr] = useState(null)
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnText, setBtnText] = useState('')
  const history = useHistory()

  const cartTotalQty = order
    ? order.items.reduce((acc, data) => acc + data.quantity, 0)
    : 0

  const cartTotalAmount = order
    ? order.items.reduce((acc, data) => acc + data.unitPrice * data.quantity, 0)
    : 0

  const renderEmptyCart = () => <EmptyCart />

  const renderError = (errors: any) => (
    <Row>
      <Col sm="12" md="12" lg="12">
        <Alert color="danger" className="p-2">
          <small className="font-weight-bolder">{JSON.stringify(errors)}</small>
        </Alert>
      </Col>
    </Row>
  )

  useEffect(() => {
    dispatch(clearStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmitOrder = useCallback(() => {
    dispatch(addOrderRequest(order!))
    // dispatch(addInvoiceRequest(invoice!))
  }, [dispatch, order])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = orderStore
    setBtnLoading(isSubmitting)
    setErr(errors)
    setBtnText('Placing order ...')
    if (isSucceeded) {
      dispatch(addInvoiceRequest(invoice!))
    }
  }, [orderStore, dispatch, invoice])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = invoiceStore
    setBtnLoading(isSubmitting)
    setErr(errors)
    setBtnText('Saving invoice ... ')
    if (isSucceeded) {
      dispatch(addSaleRequest(sale!))
    }
  }, [invoiceStore, dispatch, sale])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = saleStore
    setBtnLoading(isSubmitting)
    setErr(errors)
    setBtnText('Saving sales ... ')
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<ShoppingBag />}
          message="Order has been placed successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 10000,
          position: 'top-right'
        }
      )
      handleToggleDrawer()
      dispatch(clearCart())
      dispatch(clearProductStock())
      history.push('/admin/orders')
    }
  }, [dispatch, handleToggleDrawer, history, saleStore])

  const renderCartItems = () => (
    <table className="table cart-table mb-0">
      <thead>
        <tr>
          <th>Product</th>
          <th className="text-left">Name</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Qty</th>
          <th className="text-right">
            <span id="amount" className="amount">
              Sub-total
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
                        : require('assets/images/icons/received.svg').default
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
              <td>GHC {ct.unitPrice}</td>
              <td>{ct.quantity}</td>
              <td className="text-right">
                GHC {(ct.unitPrice * ct.quantity).toFixed(2)}
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
          <th>Value</th>
          <th className="text-right">
            <span id="amount" className="amount">
              Sub-total
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2}></td>
          <td>Order Total</td>
          <td>{order ? `GHC ${order.orderTotal}` : null}</td>
          <td className="text-right">
            {order ? `GHC ${order.orderTotal}` : null}
          </td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td>Discount</td>
          <td>
            {invoice ? `GHC ${parseFloat(invoice.discount).toFixed(2)}` : null}
          </td>
          <td className="text-right">
            {invoice
              ? `- GHC ${parseFloat(invoice.discount).toFixed(2)}`
              : null}
          </td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td>Delivery Fee</td>
          <td>
            {invoice
              ? `GHC ${parseFloat(invoice.deliveryFee).toFixed(2)}`
              : null}
          </td>
          <td className="text-right">
            {invoice
              ? `+ GHC ${parseFloat(invoice.deliveryFee).toFixed(2)}`
              : null}
          </td>
        </tr>
        {invoice &&
          invoice.taxes.map((t) => (
            <tr key={t.id}>
              <td colSpan={2}></td>
              <td>{t.tax}</td>
              <td>{`${parseFloat(t.rate) * 100}%`}</td>
              <td className="text-right">{`+ GHC ${(
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
              GHC {invoice ? invoice.finalAmount : 0}
            </span>
          </th>
        </tr>
      </tfoot>
    </table>
  )

  return (
    <Modal
      isOpen={toggleDrawer}
      toggle={handleToggleDrawer}
      className="sidebar-xxl"
      contentClassName="p-0"
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <ModalHeader handleToggleDrawer={handleToggleDrawer}>
        <span className="ml-2">Order Summary</span>
      </ModalHeader>
      <ModalBody className="flex-grow-1 pb-sm-0 py-3">
        <div className="d-block m-auto">
          {order && order.items.length ? (
            <Fragment>
              <div className="row justify-content-center m-0">
                <div className="col-md-8 col-sm-12 col-lg-8 mt-1 mb-5">
                  {err ? renderError(err) : null}
                  <div className="card product-card">
                    <div className="card-header d-flex justify-content-between">
                      <h5 className="m-0">Order Summary</h5>
                    </div>
                    <div className="card-body p-0">
                      {renderCartItems()}
                      {renderTaxes()}
                    </div>
                  </div>
                  <Row className="mb-2 mt-2">
                    <Col sm="4" md="4" lg="4">
                      <RippleButton
                        color="secondary"
                        onClick={onSubmitOrder}
                        block
                      >
                        <Collapse isOpen={btnLoading}>
                          <Spinner color="white" className="mr-2" size="sm" />{' '}
                          {btnText}
                        </Collapse>
                        <Collapse isOpen={!btnLoading}>Place Order</Collapse>
                      </RippleButton>
                    </Col>
                  </Row>
                </div>
              </div>
            </Fragment>
          ) : (
            renderEmptyCart()
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default SummaryDrawer
