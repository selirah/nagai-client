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
import { useHistory, useParams } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const { updateManufacturerRequest, clearStates, setActiveLink } =
  manufacturerActions

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

interface Fields {
  name: string
  email: string
  phone: string
  lat: string
  lng: string
  location: string
}

type QueryParam = {
  id: string
}

const validateSchema = Yup.object().shape({
  email: Yup.string().email(
    'Please input a valid email in the form john@example.com'
  ),
  phone: Yup.string()
    .matches(phoneRegExp, 'Please enter a valid phone number')
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  name: Yup.string()
    .min(2, 'Phone number is too short!')
    .required('This is a required field'),
  location: Yup.string()
    .min(2, 'Phone number is too short!')
    .required('This is a required field'),
  lat: Yup.string().required('This is a required field'),
  lng: Yup.string().required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.manufacturers)
  const [btnLoading, setBtnLoading] = useState(false)
  const [values] = useState(() => {
    const { manufacturers } = store
    const item = manufacturers.find((m) => m.id === parseInt(id))
    const payload = {
      name: item ? item.name : '',
      email: item ? item.email : '',
      phone: item ? item.phone : '',
      location: item ? item.location : '',
      lat: item ? `${item.coordinates.lat}` : '',
      lng: item ? `${item.coordinates.lng}` : ''
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
    (values: Fields) => {
      const payload: ManufacturerFields = {
        coordinates: {
          lat: parseFloat(values.lat),
          lng: parseFloat(values.lng)
        },
        email: values.email,
        location: values.location,
        logo: '',
        name: values.name,
        phone: values.phone,
        id: parseInt(id)
      }
      dispatch(updateManufacturerRequest(payload))
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
          message="Manufacturer has been updated successfully"
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
                      Update {values ? values.name : null}
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
                        value={values.lat}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lat"
                      />
                      {errors.lat && touched.lat ? (
                        <small style={{ color: '#ff0000' }}>{errors.lat}</small>
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
                        value={values.lng}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lng"
                      />
                      {errors.lng && touched.lng ? (
                        <small style={{ color: '#ff0000' }}>{errors.lng}</small>
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
