import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ResetResendFields } from 'classes'
import { Form, FormGroup, Input, Spinner, Collapse, Label } from 'reactstrap'
import RippleButton from 'core/components/ripple-button'

interface Props {
  initialValues: ResetResendFields
  onSubmit(values: ResetResendFields): void
  isSubmitting: boolean
}

const ForgottenForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, isSubmitting } = props

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please input a valid email in the form john@example.com')
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
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter the email address here .."
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
          <RippleButton type="submit" color="primary" block>
            <Collapse isOpen={isSubmitting}>
              <Spinner color="white" className="mr-2" size="sm" /> Please wait .
              . .
            </Collapse>
            <Collapse isOpen={!isSubmitting}>Send Instructions</Collapse>
          </RippleButton>
        </Form>
      )}
    </Formik>
  )
}

export default ForgottenForm
