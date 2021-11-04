import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import orderActions from 'redux/orders/actions'
import { OrderFields, OptionKey, Tax, InvoiceFields, SaleFields } from 'classes'
import RippleButton from 'core/components/ripple-button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CardTitle,
  CustomInput
} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'
import EmptyCart from 'components/EmptyCart'
import {
  generateOrderNumber,
  generateInvoiceNumber,
  generateSaleNumber
} from 'utils/index'
import CartDrawer from './CartDrawer'
import SummaryDrawer from './SummaryDrawer'

const { clearCart, setActiveLink, removeFromCart } = orderActions

const { Option } = components

type Fields = {
  orderNumber: string
  outletId: any
  orderTotal: string
  invoiceNumber: string
  taxes: any
  discount: string
  deliveryFee: string
  finalAmount: string
}

const validateSchema = Yup.object().shape({
  outletId: Yup.object().required('This is a required field'),
  discount: Yup.string().required('This is a required field'),
  deliveryFee: Yup.string().required('This is a required field')
})

const Add = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.orders)
  const authStore = Selector((state) => state.auth)
  const utilsStore = Selector((state) => state.utils)
  const { cart } = store
  const cartTotalAmount = cart.reduce(
    (acc, data) => acc + data.unitPrice * data.quantity,
    0
  )
  const [values] = useState<Fields>({
    orderNumber: generateOrderNumber(),
    orderTotal: `${cartTotalAmount.toFixed(2)}`,
    outletId: '',
    deliveryFee: '0.00',
    discount: '0.00',
    finalAmount: '',
    invoiceNumber: generateInvoiceNumber(),
    taxes: []
  })
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [toggleSummary, setToggleSummary] = useState(false)
  const [order, setOrder] = useState<OrderFields | null>(null)
  const [invoice, setInvoice] = useState<InvoiceFields | null>(null)
  const [sale, setSale] = useState<SaleFields | null>(null)

  useEffect(() => {
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSummaryDrawer = useCallback(() => {
    setToggleSummary(!toggleSummary)
  }, [toggleSummary])

  const onSubmit = useCallback(
    (values: Fields) => {
      let taxes: Tax[] = []
      let taxable: number = 0
      let total: number = 0
      values.taxes.map((t: any) => {
        const tax: Tax = JSON.parse(t)
        taxes.push(tax)
        taxable += parseFloat(tax.rate) * parseFloat(values.orderTotal)

        return { taxable, taxes }
      })

      total =
        parseFloat(values.orderTotal) -
        parseFloat(values.discount) +
        taxable +
        parseFloat(values.deliveryFee)

      const order: OrderFields = {
        orderNumber: values.orderNumber,
        orderTotal: values.orderTotal,
        items: cart,
        outletId: parseInt(values.outletId.value),
        agentId: authStore.user!.id
      }
      const invoice: InvoiceFields = {
        deliveryFee: parseFloat(values.deliveryFee).toFixed(2),
        discount: parseFloat(values.discount).toFixed(2),
        outletId: parseInt(values.outletId.value),
        finalAmount: total.toFixed(2),
        invoiceNumber: values.invoiceNumber,
        orderNumber: values.orderNumber,
        taxes: taxes
      }
      const sale: SaleFields = {
        id: generateSaleNumber(),
        amount: total.toFixed(2),
        amountLeft: '0.00',
        amountPaid: '0.00',
        invoiceId: values.invoiceNumber,
        orderId: values.orderNumber
      }
      setOrder(order)
      setInvoice(invoice)
      setSale(sale)
      handleSummaryDrawer()
      // dispatch(addOrderRequest(payload))
    },
    [authStore.user, cart, handleSummaryDrawer]
  )

  const renderEmptyCart = () => (
    <div className="mt-3">
      <EmptyCart />
    </div>
  )

  const handleDrawer = useCallback(() => {
    setToggleDrawer(!toggleDrawer)
  }, [toggleDrawer])

  const removeItem = useCallback(
    (index: number) => {
      dispatch(removeFromCart(index))
    },
    [dispatch]
  )

  const emptyCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const outletOptions: OptionKey[] = []
  utilsStore.outlets.map((o) => {
    outletOptions.push({
      value: `${o.id}`,
      label: o.outletName.toUpperCase()
    })
    return outletOptions
  })

  const selectOptions = [
    {
      label: 'Select Outlet',
      options: outletOptions
    }
  ]

  const OptionComponent = ({ data, ...props }: any) => {
    return (
      <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">{data.label}</div>
        </div>
      </Option>
    )
  }

  return (
    <div className="list-group todo-task-list-wrapper">
      <PerfectScrollbar
        options={{ wheelPropagation: false }}
        containerRef={(ref: any) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect()

              return { ...original, height: Math.floor(original.height) }
            }
          }
        }}
      >
        {cart.length ? (
          <Formik
            initialValues={values}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={validateSchema}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
            }) => (
              <Form className="mt-2" onSubmit={handleSubmit}>
                <Row className="px-3">
                  <Col sm="12" md="12" lg="12">
                    <CardTitle
                      tag="h2"
                      className="font-weight-bold text-secondary"
                    >
                      Prepare order for cart ({cart.length} items){' '}
                      <span className="ml-1">
                        <Link to="#" onClick={handleDrawer}>
                          <small className="font-weight-bolder">
                            View Cart
                          </small>
                        </Link>
                      </span>
                    </CardTitle>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="orderNumber">
                        Order number <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="orderNumber"
                        placeholder="Order number"
                        value={values.orderNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="orderNumber"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="orderTotal">
                        Order Total (GHC){' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="orderTotal"
                        placeholder="Order number"
                        value={values.orderTotal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="orderTotal"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="outletId">
                        Outlet <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <SelectComponent
                        id="outletId"
                        name="outletId"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.outletId}
                        touched={touched.outletId}
                        options={selectOptions}
                        optionComponent={OptionComponent}
                        value={values.outletId}
                        placeholder="Select outlet.."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3 mt-2">
                  <Col sm="12" md="12" lg="12">
                    <CardTitle
                      tag="h2"
                      className="font-weight-bold text-secondary"
                    >
                      Order Invoice
                    </CardTitle>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="invoiceNumber">
                        Invoice number{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="invoiceNumber"
                        placeholder="Invoice number"
                        value={values.invoiceNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="invoiceNumber"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="taxes">
                        Taxes
                      </Label>
                      {utilsStore.taxes.map((tax) => (
                        <CustomInput
                          type="checkbox"
                          className="custom-control-Primary mb-1"
                          id={tax.id}
                          label={`${tax.tax} (${parseFloat(tax.rate) * 100}%)`}
                          name={`taxes`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={`${JSON.stringify(tax)}`}
                          key={tax.id}
                        />
                      ))}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="discount">
                        Discount in GHC{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="discount"
                        placeholder="Enter discount"
                        value={values.discount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="discount"
                      />
                      {errors.discount && touched.discount ? (
                        <small style={{ color: '#ff0000', fontWeight: 700 }}>
                          {errors.discount}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="deliveryFee">
                        Delivery fee in GHC{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="deliveryFee"
                        placeholder="Delivery fee"
                        value={values.deliveryFee}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="deliveryFee"
                      />
                      {errors.deliveryFee && touched.deliveryFee ? (
                        <small style={{ color: '#ff0000', fontWeight: 700 }}>
                          {errors.deliveryFee}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3 mb-2 mt-2">
                  <Col sm="4" md="4" lg="4">
                    <RippleButton type="submit" color="primary" block>
                      Order Summary
                    </RippleButton>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        ) : (
          renderEmptyCart()
        )}
      </PerfectScrollbar>
      <CartDrawer
        toggleDrawer={toggleDrawer}
        handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        cart={cart}
        removeItem={removeItem}
        emptyCart={emptyCart}
      />
      <SummaryDrawer
        toggleDrawer={toggleSummary}
        handleToggleDrawer={() => setToggleSummary(!toggleSummary)}
        invoice={invoice}
        order={order}
        sale={sale}
      />
    </div>
  )
}

export default Add
