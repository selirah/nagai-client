import { useEffect, useState, Fragment, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import productActions from 'redux/products/actions'
import { ProductFields, OptionKey } from 'classes'
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
import { useHistory, useParams } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'

const { updateProductRequest, clearStates, setActiveLink } = productActions

const { Option } = components

interface Fields {
  productName: string
  categoryId: any
  manufacturerId: any
}

type QueryParam = {
  id: string
}

const validateSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, 'Product name is too short!')
    .required('This is a required field'),
  manufacturerId: Yup.object().required('This is a required field'),
  categoryId: Yup.object().required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.products)
  const { categories } = Selector((state) => state.categories)
  const { manufacturers } = Selector((state) => state.manufacturers)
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [values] = useState(() => {
    const { products } = store
    const item = products.find((p) => p.id === id)
    const payload = {
      productName: item ? item.productName : '',
      categoryId: item
        ? { label: item.category.category, value: item.category.id }
        : '',
      manufacturerId: item
        ? { label: item.manufacturer.name, value: item.manufacturer.id }
        : ''
    }
    return payload
  })

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('edit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: ProductFields = {
        categoryId: parseInt(values.categoryId.value),
        manufacturerId: parseInt(values.manufacturerId.value),
        productName: values.productName,
        id: id
      }
      dispatch(updateProductRequest(payload))
    },
    [dispatch, id]
  )

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Product has been updated successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/products')
    }
  }, [store, history])

  const categoryOptions: OptionKey[] = []
  const manufacturerOptions: OptionKey[] = []

  categories.map((c) => {
    categoryOptions.push({
      value: `${c.id}`,
      label: c.category
    })
    return categoryOptions
  })

  manufacturers.map((m) => {
    manufacturerOptions.push({
      value: `${m.id}`,
      label: m.name
    })
    return manufacturerOptions
  })

  const cSelectOptions = [
    {
      label: 'Select Category of Product',
      options: categoryOptions
    }
  ]

  const mSelectOptions = [
    {
      label: 'Select Manufacturer of Product',
      options: manufacturerOptions
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
                    <CardTitle tag="h2" className="font-weight-light">
                      Update {values ? values.productName : null}
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="productName">
                        Product name <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="productName"
                        placeholder="Enter name of product"
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="productName"
                      />
                      {errors.productName && touched.productName ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.productName}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="categoryId">
                        Category <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <SelectComponent
                        id="categoryId"
                        name="categoryId"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.categoryId}
                        touched={touched.categoryId}
                        options={cSelectOptions}
                        optionComponent={OptionComponent}
                        value={values.categoryId}
                        placeholder="Select category.."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="manufacturerId">
                        Maufacturer <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <SelectComponent
                        id="manufacturerId"
                        name="manufacturerId"
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.manufacturerId}
                        touched={touched.manufacturerId}
                        options={mSelectOptions}
                        optionComponent={OptionComponent}
                        value={values.manufacturerId}
                        placeholder="Select manufacturer.."
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
                      <Collapse isOpen={!btnLoading}>Update Details</Collapse>
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

export default Edit
