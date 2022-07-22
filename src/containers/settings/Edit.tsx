import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import userActions from '@redux/users/actions'
import { Company } from '@classes/index'
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
import { useHistory } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const { addCompanyRequest, updateCompanyRequest, clearStates, setActiveLink } =
  userActions

const validateSchema = Yup.object().shape({
  name: Yup.string().required('This is a required field'),
  email: Yup.string()
    .email('Please input a valid email in the form john@example.com')
    .required('This is a required field'),
  phone: Yup.string()
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  smsID: Yup.string()
    .max(11, 'SMS ID is too long!')
    .required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.users)
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [values, setValues] = useState(() => {
    const { company } = store
    const payload: Company = {
      name: company ? company.name : '',
      email: company ? company.email : '',
      phone: company ? company.phone : '',
      logo: company ? company.logo : '',
      id: company ? company.id : 0,
      smsID: company ? company.smsID : ''
    }
    return payload
  })

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: Company) => {
      if (values.id === 0) {
        dispatch(addCompanyRequest(values))
      } else {
        dispatch(updateCompanyRequest(values))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const { company } = store
    setValues({
      name: company ? company.name : '',
      email: company ? company.email : '',
      phone: company ? company.phone : '',
      logo: company ? company.logo : '',
      id: company ? company.id : 0,
      smsID: company ? company.smsID : ''
    })
  }, [store])

  useEffect(() => {
    const { isSubmitting, isSucceeded, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Comapny has been updated successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/settings')
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
                    Update Company
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="name">
                      Name <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Enter name of company"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                    />
                    {errors.name && touched.name ? (
                      <small style={{ color: '#ff0000' }}>{errors.name}</small>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="email">
                      Email address <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter email of company"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                    />
                    {errors.email && touched.email ? (
                      <small style={{ color: '#ff0000' }}>{errors.email}</small>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="phone">
                      Phone number <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="Enter phone number of company"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone"
                    />
                    {errors.phone && touched.phone ? (
                      <small style={{ color: '#ff0000' }}>{errors.phone}</small>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="smsID">
                      SMS ID <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="smsID"
                      placeholder="Enter SMS ID of company"
                      value={values.smsID}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="smsID"
                    />
                    {errors.smsID && touched.smsID ? (
                      <small style={{ color: '#ff0000' }}>{errors.smsID}</small>
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
                    <Collapse isOpen={!btnLoading}>Update Profile</Collapse>
                  </RippleButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </PerfectScrollbar>
    </div>
  )
}

export default Edit
