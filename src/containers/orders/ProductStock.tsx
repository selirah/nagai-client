import { useEffect, useState, Fragment, useCallback, ChangeEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import orderActions from 'redux/orders/actions'
import { Stock, Item } from 'classes'
import EmptyStock from 'components/EmptyStock'
import { PuffLoader } from 'react-spinners'
import PerfectScrollbar from 'react-perfect-scrollbar'
import RippleButton from 'core/components/ripple-button'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, FormGroup, Label, Input, Row, Col, CardTitle } from 'reactstrap'
import { ShoppingCart } from 'react-feather'
import CartDrawer from './CartDrawer'

const { clearStates, setActiveLink, addToCart, clearCart, removeFromCart } =
  orderActions

type QueryParam = {
  id: string
}

type Field = {
  quantity: string
  total: string
}

const validateSchema = Yup.object().shape({
  quantity: Yup.number().min(1).required('This is a required field')
})

const ProductStock = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.orders)
  const stockStore = Selector((state) => state.stock)
  const [loading, setLoading] = useState(false)
  const [productStock, setProductStock] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [initValues] = useState<Field>({ quantity: '', total: '' })
  const {
    handleChange,
    values,
    setFieldValue,
    touched,
    errors,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues: initValues,
    onSubmit: (values) => onAddToCart(values),
    validationSchema: validateSchema
  })
  const [cart, setCart] = useState<Item[]>([])
  const [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('product-stock'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { loading, productStock } = stockStore
    const { cart } = store
    setLoading(loading)
    setProductStock(productStock)
    setCart(cart)
  }, [stockStore, store])

  const renderLoader = () => (
    <div className="mt-5 text-primary d-flex justify-content-center h-100 w-100">
      <PuffLoader color="#0090fe" />
    </div>
  )

  const renderEmptyList = () => <EmptyStock productId={id} />

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const stock = productStock.find((s) => s.id === e.target.value)
      if (stock !== undefined) {
        setSelectedStock(stock)
      }
    },
    [productStock]
  )

  const onAddToCart = useCallback(
    (values: Field) => {
      const payload: Item = {
        product: selectedStock!.product,
        quantity: parseInt(values.quantity),
        sku: selectedStock!.sku,
        unit: selectedStock!.unit,
        unitPrice: selectedStock!.unitPrice
      }
      dispatch(addToCart(payload))

      toast.success(
        <ToastBox
          color="success"
          icon={<ShoppingCart />}
          message="Product added to cart successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      setSelectedStock(null)
    },
    [dispatch, selectedStock]
  )

  const renderStockList = () => (
    <div className="plans">
      <div className="title">
        Select product type using the SKU
        {cart.length ? (
          <span className="ml-2">
            <Link to="/admin/orders/add">
              <small className="font-weight-bold">Generate order</small>
            </Link>{' '}
            |{' '}
            <Link to="#" onClick={handleDrawer}>
              <small className="font-weight-bold">View Cart</small>
            </Link>
          </span>
        ) : null}
      </div>
      {productStock.map((ps) => (
        <label className="plan mt-1" htmlFor={ps.id} key={ps.id}>
          <input
            type="radio"
            name="productStock"
            id={ps.id}
            onChange={onChange}
            value={ps.id}
            checked={selectedStock !== null && selectedStock.id === ps.id}
          />
          <div className="plan-content">
            <img
              loading="lazy"
              src={
                ps.product.avatar
                  ? ps.product.avatar
                  : require('assets/images/icons/received.svg').default
              }
              width={100}
              alt=""
            />
            <div className="plan-details">
              <h6>{`${ps.product.productName.toUpperCase()} (${ps.sku})`}</h6>
              <p>
                Unit price: <span>{`GHC ${ps.unitPrice}`}</span>
              </p>
              <p>
                Quantity in stock:{' '}
                <span>{`${ps.quantityInStock} ${ps.unit}(s)`}</span>
              </p>
              <p>
                Status:{' '}
                {ps.quantityInStock > 0 ? (
                  <span className="text-success">In stock</span>
                ) : (
                  <span className="text-danger">Out of stock</span>
                )}
              </p>
            </div>
          </div>
        </label>
      ))}
    </div>
  )

  const customHandleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      setFieldValue('quantity', value)
      if (value) {
        setFieldValue(
          'total',
          (parseInt(value) * selectedStock!.unitPrice).toFixed(2)
        )
      }
    },
    [setFieldValue, selectedStock]
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

  return (
    <Fragment>
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
          <div className="d-block p-2">
            {loading
              ? renderLoader()
              : productStock.length
              ? renderStockList()
              : renderEmptyList()}

            {selectedStock ? (
              <Form className="mt-2" onSubmit={handleSubmit}>
                <Row className="px-0">
                  <Col sm="12" md="12" lg="12">
                    <CardTitle
                      tag="h4"
                      className="font-weight-bold text-primary"
                    >
                      Prepare Order for{' '}
                      {`${selectedStock.product.productName.toUpperCase()} (${
                        selectedStock.sku
                      })`}
                    </CardTitle>
                  </Col>
                </Row>

                <Row className="px-0 mb-1">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="quantity">
                        Quantity <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="number"
                        id="quantity"
                        placeholder="Enter the quantity to purchase"
                        value={values.quantity}
                        onChange={customHandleChange}
                        onBlur={handleBlur}
                        name="quantity"
                      />
                      {errors.quantity && touched.quantity ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.quantity}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="total">
                        Total amount (GHC){' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="number"
                        id="total"
                        placeholder="Total amount will be dispalyed here"
                        value={values.total}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="total"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-0">
                  <Col sm="4" md="4" lg="4">
                    <RippleButton type="submit" color="primary">
                      <ShoppingCart size={14} className="mr-2" /> Add to Cart
                    </RippleButton>
                  </Col>
                </Row>
              </Form>
            ) : null}
          </div>
        </PerfectScrollbar>
        <CartDrawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
          cart={cart}
          removeItem={removeItem}
          emptyCart={emptyCart}
        />
      </div>
    </Fragment>
  )
}

export default ProductStock
