import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ResetResendFields } from '@classes/index'
import {
  Form,
  FormGroup,
  Input,
  Spinner,
  Collapse,
  Label,
  Row,
  Col,
  Alert
} from 'reactstrap'
import RippleButton from '@core/components/ripple-button'

interface Props {
  initialValues: ResetResendFields
  onSubmit(values: ResetResendFields): void
  isSubmitting: boolean
  errs: any
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email in the form john@example.com')
    .required('This is a required field')
})

const ForgottenForm: React.FC<Props> = (props) => {
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
