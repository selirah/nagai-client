import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import userActions from '@redux/users/actions'
import { UserFields, OptionKey, Roles } from '@classes/index'
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
  CustomInput,
  Alert
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from '@components/Select'

const { addUserRequest, clearStates, setActiveLink } = userActions

const { Option } = components

const validateSchema = Yup.object().shape({
  firstName: Yup.string().required('This is a required field'),
  lastName: Yup.string().required('This is a required field'),
  email: Yup.string()
    .email('Please input a valid email in the form john@example.com')
    .required('This is a required field'),
  phone: Yup.string()
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  role: Yup.object().required('This is a required field')
})

interface Fields {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: any
  isVerified: boolean
}

const Add = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.users)
  const [values] = useState<Fields>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    isVerified: false
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: UserFields = {
        role: values.role.value,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        isVerified: values.isVerified
      }
      dispatch(addUserRequest(payload))
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
          message="User has been created successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/users')
    }
  }, [store, history])

  const rolesOptions: OptionKey[] = []
  Roles.map((r) => {
    rolesOptions.push({
      value: `${r.role}`,
      label: r.role
    })
    return rolesOptions
  })

  const selectOptions = [
    {
      label: 'Select Role for User',
      options: rolesOptions
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
                    Create a User
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="firstName">
                      First name <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="Enter first name of user"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstName"
                    />
                    {errors.firstName && touched.firstName ? (
                      <small style={{ color: '#ff0000' }}>
                        {errors.firstName}
                      </small>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="lastName">
                      Last name <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Enter last name of user"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastName"
                    />
                    {errors.lastName && touched.lastName ? (
                      <small style={{ color: '#ff0000' }}>
                        {errors.lastName}
                      </small>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="email">
                      Email address <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Enter email of user"
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
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="phone">
                      Phone number <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="Enter phone number of user"
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
              </Row>
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="role">
                      Role <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <SelectComponent
                      id="role"
                      name="role"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.role}
                      touched={touched.role}
                      options={selectOptions}
                      optionComponent={OptionComponent}
                      value={values.role}
                      placeholder="Select role of user.."
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <Label className="form-label" for="role">
                    Verify user
                  </Label>
                  <FormGroup>
                    <CustomInput
                      type="switch"
                      className="custom-control-Primary"
                      id="isVerified"
                      label="Switch to verify user automatically"
                      name="isVerified"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    <Collapse isOpen={!btnLoading}>Save User</Collapse>
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

export default Add
