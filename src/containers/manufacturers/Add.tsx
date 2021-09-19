import { useEffect, useState, Fragment, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import manufacturerActions from 'redux/manufacturers/actions'
import { ManufacturerFields } from 'classes'
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
import { useHistory } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const { addManufacturerRequest, clearStates, setActiveLink } =
  manufacturerActions

const validateSchema = Yup.object().shape({
  email: Yup.string().email(
    'Please input a valid email in the form john@example.com'
  ),
  phone: Yup.string()
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  name: Yup.string()
    .min(2, 'Name is too short!')
    .required('This is a required field'),
  location: Yup.string()
    .min(2, 'Phone number is too short!')
    .required('This is a required field'),
  coordinates: Yup.object().shape({
    lat: Yup.string().required('This is a required field'),
    lng: Yup.string().required('This is a required field')
  })
})

const Add = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.manufacturers)
  const [values] = useState<ManufacturerFields>({
    name: '',
    email: '',
    phone: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    location: '',
    logo: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

  const onSubmit = useCallback(
    (values: ManufacturerFields) => {
      dispatch(addManufacturerRequest(values))
    },
    [dispatch]
  )

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
          message="Manufacturer has been created successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/manufacturers')
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
                      Create a manufacturer
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="name">
                        Name of manufacturer{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Enter name of manufacturer"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                      />
                      {errors.name && touched.name ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.name}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="location">
                        Location of manufacturer{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="location"
                        placeholder="Enter location of manufacturer"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="location"
                      />
                      {errors.location && touched.location ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.location}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="phone">
                        Phone of manufacturer{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="phone"
                        placeholder="Enter phone of manufacturer"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                      />
                      {errors.phone && touched.phone ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.phone}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="email">
                        Email of manufacturer
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Enter location of manufacturer"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.email}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="lat">
                        Latitude of manufacturer{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="lat"
                        placeholder="Enter latitude of manufacturer"
                        value={values.coordinates.lat}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="coordinates.lat"
                      />
                      {errors.coordinates &&
                      errors.coordinates.lat &&
                      touched.coordinates &&
                      touched.coordinates.lat ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.coordinates.lat}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="lng">
                        Longitude of manufacturer{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="lng"
                        placeholder="Enter longitude of manufacturer"
                        value={values.coordinates.lng}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="coordinates.lng"
                      />
                      {errors.coordinates &&
                      errors.coordinates.lng &&
                      touched.coordinates &&
                      touched.coordinates.lng ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.coordinates.lng}
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
                      <Collapse isOpen={!btnLoading}>Save Details</Collapse>
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
