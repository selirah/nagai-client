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
  Collapse
} from 'reactstrap'
import RippleButton from 'core/components/ripple-button'
import InputPasswordToggle from 'core/components/input-password-toggle'

interface Props {
  initialValues: RegisterFields
  onSubmit(values: RegisterFields): void
  isSubmitting: boolean
}

const RegisterForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, isSubmitting } = props

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please input a valid email in the form john@example.com')
      .required('This is a required field'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('This is a required field'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Please enter a valid phone number')
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
              type="switch"
              className="custom-control-Primary"
              id="terms"
              label="Accept terms and privacy policy"
              name="terms"
              onChange={handleChange}
              onBlur={handleBlur}
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
