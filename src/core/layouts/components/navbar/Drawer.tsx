import React from 'react'
import { X } from 'react-feather'
import RippleButton from 'core/components/ripple-button'
import { Modal, ModalBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Item } from 'classes'
import EmptyCart from 'components/EmptyCart'
import { Trash2, Trash } from 'react-feather'

interface Props {
  toggleDrawer: boolean
  handleToggleDrawer: () => void
  cart: Item[]
  removeItem: (index: number) => void
  emptyCart: () => void
}

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

const Drawer: React.FC<Props> = (props) => {
  const { handleToggleDrawer, toggleDrawer, cart, removeItem, emptyCart } =
    props
  const renderEmptyCart = () => <EmptyCart />

  const cartTotalQty = cart.reduce((acc, data) => acc + data.quantity, 0)

  const cartTotalAmount = cart.reduce(
    (acc, data) => acc + data.unitPrice * data.quantity,
    0
  )

  const renderCartItems = () => (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 col-sm-12 col-lg-8 mt-5 mb-5">
        <div className="card">
          <div className="card-header p-2">
            <div className="card-header-flex">
              <h5 className="m-0">Cart Items ({cart.length})</h5>
              {cart.length > 0 ? (
                <RippleButton
                  className="mt-0"
                  size="sm"
                  color="danger"
                  onClick={() => emptyCart()}
                >
                  <Trash size={14} className="mr-2" />
                  <span>Empty Cart</span>
                </RippleButton>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table cart-table mb-0 table-responsive">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Product</th>
                  <th className="text-left">Name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-right">
                    <span id="amount" className="amount">
                      Total Amount
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((ct, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="prdct-delete"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 />
                      </button>
                    </td>
                    <td>
                      <div className="product-img">
                        <img
                          src={
                            ct.product.avatar
                              ? ct.product.avatar
                              : require('assets/images/icons/brand-identity.svg')
                                  .default
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
                  <th>&nbsp;</th>
                  <th colSpan={4}>&nbsp;</th>
                  <th>
                    <span className="text-danger">{cartTotalQty}</span>
                  </th>
                  <th className="text-right">
                    <span className="text-danger">
                      GHC {cartTotalAmount.toFixed(2)}
                    </span>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
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
        <span className="ml-2">Cart</span>
      </ModalHeader>
      <ModalBody className="flex-grow-1 pb-sm-0 py-3">
        <div className="d-block m-auto">
          {cart.length ? renderCartItems() : renderEmptyCart()}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default Drawer
