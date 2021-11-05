import { useEffect, useState, Fragment, useCallback } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import categoriesActions from '@redux/categories/actions'
import { Category } from '@classes/index'
import { toast, Slide } from 'react-toastify'
import RippleButton from '@core/components/ripple-button'
import ToastBox from '@components/ToastBox'
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

const { updateCategoryRequest, clearStates, setActiveLink } = categoriesActions

type QueryParam = {
  id: string
}

const validateSchema = Yup.object().shape({
  category: Yup.string()
    .min(2, 'Name is too short!')
    .required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.categories)
  const [btnLoading, setBtnLoading] = useState(false)
  const [values] = useState(() => {
    const { categories } = store
    const item = categories.find((c) => c.id === parseInt(id))
    const payload = {
      category: item ? item.category : '',
      products: item ? item.products : [],
      createdAt: item ? item.createdAt : new Date(),
      updatedAt: item ? item.updatedAt : new Date(),
      id: item ? item.id : 0
    }
    return payload
  })
  const history = useHistory()
  const [err, setErr] = useState(null)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('edit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: Category) => {
      const payload: Category = {
        category: values.category,
        id: parseInt(id),
        createdAt: values.updatedAt,
        products: values.products,
        updatedAt: values.updatedAt
      }
      dispatch(updateCategoryRequest(payload))
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
          message="Product category has been updated successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/product-categories')
    }
  }, [store, history])

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
              handleSubmit
            }) => (
              <Form className="mt-2" onSubmit={handleSubmit}>
                <Row className="px-3">
                  <Col sm="12" md="12" lg="12">
                    <CardTitle tag="h2" className="font-weight-light">
                      Update {values ? values.category : null}
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="category">
                        Name <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="category"
                        placeholder="Enter name of category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="category"
                      />
                      {errors.category && touched.category ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.category}
                        </small>
                      ) : null}
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
