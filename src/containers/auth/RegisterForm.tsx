import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RegisterFields } from 'classes'
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
import RippleButton from 'core/components/ripple-button'
import InputPasswordToggle from 'core/components/input-password-toggle'

interface Props {
  initialValues: RegisterFields
  onSubmit(values: RegisterFields): void
  isSubmitting: boolean
  errs: any
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email in the form john@example.com')
    .required('This is a required field'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('This is a required field'),
  phone: Yup.string()
    .min(10, 'Phone number is too short!')
    .max(12, 'Phone number is too long!')
    .required('This is a required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('This is a required field'),
  terms: Yup.bool()
    .oneOf([true], 'Please accepts the terms and conditions')
    .required('This is a required field')
})

const RegisterForm: React.FC<Props> = (props) => {
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
            <Label className="form-label" for="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
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
            <Label className="form-label" for="phone">
              Phone
            </Label>
            <Input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
            />
            {errors.phone && touched.phone ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.phone}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label className="form-label" for="password">
              Password
            </Label>
            <InputPasswordToggle
              className="input-group-merge"
              id="password"
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
            <Label className="form-label" for="confirm-password">
              Confirm password
            </Label>
            <InputPasswordToggle
              className="input-group-merge"
              id="confirm-password"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="Confirm your password"
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.confirmPassword}
              </small>
            ) : null}
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              className="custom-control-Primary"
              id="terms"
              label="Accept terms and privacy policy"
              name="terms"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.terms}
            />
            {errors.terms && touched.terms ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.terms}
              </small>
            ) : null}
          </FormGroup>
          <RippleButton type="submit" color="primary" block>
            <Collapse isOpen={isSubmitting}>
              <Spinner color="white" className="mr-2" size="sm" /> Please wait .
              . .
            </Collapse>
            <Collapse isOpen={!isSubmitting}>Sign up</Collapse>
          </RippleButton>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
