import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { VerifyFields } from 'classes'
import { Form, FormGroup, Input, Spinner, Collapse, Label } from 'reactstrap'
import RippleButton from 'core/components/ripple-button'

interface Props {
  initialValues: VerifyFields
  onSubmit(values: VerifyFields): void
  isSubmitting: boolean
}

const VerifyForm: React.FC<Props> = (props) => {
  const { initialValues, onSubmit, isSubmitting } = props

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('This is a required field')
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
            <Label className="form-label" for="code">
              Verification code
            </Label>
            <Input
              type="text"
              id="code"
              placeholder="Enter the verification code here .."
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              name="code"
            />
            {errors.code && touched.code ? (
              <small style={{ color: '#ff0000', fontWeight: 700 }}>
                {errors.code}
              </small>
            ) : null}
          </FormGroup>
          <RippleButton type="submit" color="primary" block>
            <Collapse isOpen={isSubmitting}>
              <Spinner color="white" className="mr-2" size="sm" /> Verifying
              account . . .
            </Collapse>
            <Collapse isOpen={!isSubmitting}>Verify Account</Collapse>
          </RippleButton>
        </Form>
      )}
    </Formik>
  )
}

export default VerifyForm
