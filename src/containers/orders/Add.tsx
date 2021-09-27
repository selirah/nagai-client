import { useEffect, useState, Fragment, useCallback } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import orderActions from 'redux/orders/actions'
import { OrderFields, OptionKey } from 'classes'
import { toast, Slide } from 'react-toastify'
import RippleButton from 'core/components/ripple-button'
import ToastBox from 'components/ToastBox'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Collapse,
  Row,
  Col,
  CardTitle,
  Alert
} from 'reactstrap'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'
import EmptyCart from 'components/EmptyCart'
import { generateReadableNumbers } from 'utils'
import CartDrawer from './CartDrawer'

const {
  addOrderRequest,
  clearStates,
  clearCart,
  setActiveLink,
  removeFromCart
} = orderActions

const { Option } = components

type Fields = {
  orderNumber: string
  outletId: any
  orderTotal: number
}

const validateSchema = Yup.object().shape({
  outletId: Yup.object().required('This is a required field')
})

const Add = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.orders)
  const authStore = Selector((state) => state.auth)
  const utilsStore = Selector((state) => state.utils)
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const { cart } = store
  const cartTotalAmount = cart.reduce(
    (acc, data) => acc + data.unitPrice * data.quantity,
    0
  )
  const [values] = useState<Fields>({
    orderNumber: generateReadableNumbers(),
    orderTotal: cartTotalAmount,
    outletId: ''
  })
  const [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Order is placed successfully. Add the order invoice"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/invoices/add')
    }
  }, [store, history])

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: OrderFields = {
        orderNumber: values.orderNumber,
        orderTotal: values.orderTotal,
        items: cart,
        outletId: parseInt(values.outletId.value),
        agentId: authStore.user!.id
      }
      dispatch(addOrderRequest(payload))
    },
    [dispatch]
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

  const renderError = (errors: any) => (
    <Row className="px-3">
      <Col sm="12" md="12" lg="12">
        <Alert color="danger" className="p-2">
          <small className="font-weight-bolder">
            {errors.errors[0].message}
          </small>
        </Alert>
      </Col>
    </Row>
  )

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
                    <CardTitle tag="h2" className="font-weight-light">
                      Prepare order for cart ({cart.length} items){' '}
                      <span className="ml-1">
                        <Link to="#" onClick={handleDrawer}>
                          <small className="font-weight-bold">View Cart</small>
                        </Link>
                      </span>
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
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
                <Row className="px-3 mb-2">
                  <Col sm="4" md="4" lg="4">
                    <RippleButton type="submit" color="primary" block>
                      <Collapse isOpen={btnLoading}>
                        <Spinner color="white" className="mr-2" size="sm" />{' '}
                        Saving . . .
                      </Collapse>
                      <Collapse isOpen={!btnLoading}>Place order</Collapse>
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
    </div>
  )
}

export default Add
