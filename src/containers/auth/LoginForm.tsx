import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { LoginFields } from '@classes/index'
import {
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Spinner,
  Collapse,
  Row,
  Col,
  Alert
} from 'reactstrap'
import RippleButton from '@core/components/ripple-button'
import { PUBLIC_ROUTES } from '@router/constants'
import InputPasswordToggle from '@core/components/input-password-toggle'

interface Props {
  initialValues: LoginFields
  onSubmit(values: LoginFields): void
  isSubmitting: boolean
  errs: any
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email in the form john@example.com')
    .required('This is a required field'),
  password: Yup.string().required('This is a required field')
})

const LoginForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, isSubmitting, errs } = props

  const renderError = (errors: any) => (
    <Row>
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
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
          {errs ? renderError(errs) : null}
          <FormGroup>
            <Label className="form-label" for="login-email">
              Email
            </Label>
            <Input
              type="email"
              id="login-email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
            />
            {errors.email && touched.email ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.email}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-between">
              <Label className="form-label" for="login-password">
                Password
              </Label>
            </div>
            <InputPasswordToggle
              className="input-group-merge"
              id="login-password"
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.password}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-between">
              <CustomInput
                type="checkbox"
                className="custom-control-Primary"
                id="remember-me"
                label="Remember Me"
                name="rememberMe"
              />
              <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD}>
                <small>Forgot Password?</small>
              </Link>
            </div>
          </FormGroup>
          <RippleButton type="submit" color="primary" block>
            <Collapse isOpen={isSubmitting}>
              <Spinner color="white" className="mr-2" size="sm" />{' '}
              Authenticating . . .
            </Collapse>
            <Collapse isOpen={!isSubmitting}>Sign in</Collapse>
          </RippleButton>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
