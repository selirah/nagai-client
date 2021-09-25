import { useEffect, useState, Fragment, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import stockActions from 'redux/stock/actions'
import { StockFields, OptionKey, Product } from 'classes'
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
import DatePickerComponent from 'components/DatePicker'

const { addStockRequest, clearStates, setActiveLink } = stockActions

const { Option } = components

const validateSchema = Yup.object().shape({
  sku: Yup.string().required('This is a required field'),
  unit: Yup.object().required('This is a required field'),
  unitPrice: Yup.number().required('This is a required field'),
  quantityPurchased: Yup.number().required('This is a required field'),
  reorderLevel: Yup.number().required('This is a required field'),
  reorderQuantity: Yup.number().required('This is a required field'),
  reorderDate: Yup.date().required('This is a required field')
})

type QueryParam = {
  id: string
}

const Add = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.stock)
  const utils = Selector((state) => state.utils)
  const productStore = Selector((state) => state.products)
  const [values] = useState<StockFields>({
    id: '',
    productId: id,
    sku: '',
    unit: '',
    unitPrice: '',
    quantityPurchased: '',
    reorderLevel: '',
    reorderQuantity: '',
    reorderDate: new Date(),
    comments: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    const { product } = productStore
    values.productId = product ? product.id : id
    setBtnLoading(isSubmitting)
    setErr(errors)
    setProduct(product)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Stock has been added successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/stock')
    }
  }, [store, history, id, productStore, values])

  const onSubmit = useCallback(
    (values: StockFields) => {
      values.unit = values.unit.value
      dispatch(addStockRequest(values))
    },
    [dispatch]
  )

  const unitOptions: OptionKey[] = []

  utils.units.map((u) => {
    unitOptions.push({
      value: `${u.description}`,
      label: `${u.description}`
    })
    return unitOptions
  })

  const uSelectOptions = [
    {
      label: 'Select Unit of Product',
      options: unitOptions
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
                      className="font-weight-light text-primary"
                    >
                      Create stock for {product ? product.productName : null}
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="productId">
                        Product ID <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="productId"
                        placeholder="Enter product ID"
                        value={values.productId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="productId"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="sku">
                        Product SKU <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="sku"
                        placeholder="Enter product sku"
                        value={values.sku}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="sku"
                      />
                      {errors.sku && touched.sku ? (
                        <small style={{ color: '#ff0000' }}>{errors.sku}</small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="unit">
                        Unit <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <SelectComponent
                        id="unit"
                        name="unit"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.unit}
                        touched={touched.unit}
                        options={uSelectOptions}
                        optionComponent={OptionComponent}
                        value={values.unit}
                        placeholder="Select unit of product.."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="unitPrice">
                        Product unit price{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="unitPrice"
                        placeholder="Enter product unit price"
                        value={values.unitPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="unitPrice"
                      />
                      {errors.unitPrice && touched.unitPrice ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.unitPrice}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="quantityPurchased">
                        Quantity purchased{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="quantityPurchased"
                        placeholder="Enter quantity purchased"
                        value={values.quantityPurchased}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="quantityPurchased"
                      />
                      {errors.quantityPurchased && touched.quantityPurchased ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.quantityPurchased}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="reorderLevel">
                        Reorder level{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="reorderLevel"
                        placeholder="Enter level for reordering"
                        value={values.reorderLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="reorderLevel"
                      />
                      {errors.reorderLevel && touched.reorderLevel ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.reorderLevel}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="reorderQuantity">
                        Redorder quantity{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="reorderQuantity"
                        placeholder="Enter reorder quantity"
                        value={values.reorderQuantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="reorderQuantity"
                      />
                      {errors.reorderQuantity && touched.reorderQuantity ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.reorderQuantity}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="reorderDate">
                        Reorder date <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <DatePickerComponent
                        id="reorderDate"
                        name="reorderDate"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        value={values.reorderDate}
                        error={errors.reorderDate}
                        touched={touched.reorderDate}
                        placeholder="Enter date .."
                        minDate={new Date()}
                        showDisabledMonthNavigation
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="4" lg="4">
                    <FormGroup>
                      <Label className="form-label" for="comments">
                        Comments quantity
                      </Label>
                      <Input
                        type="textarea"
                        id="comments"
                        placeholder="Enter any comment"
                        value={values.comments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="comments"
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
                      <Collapse isOpen={!btnLoading}>Save</Collapse>
                    </RippleButton>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </PerfectScrollbar>
      </div>
    </Fragment>
  )
}

export default Add
