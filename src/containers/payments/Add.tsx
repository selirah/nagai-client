import { useEffect, useState, Fragment, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import paymentActions from '@redux/payments/actions'
import { PaymentFields } from '@classes/index'
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
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const { addPaymentRequest, clearStates, setActiveLink } = paymentActions

const validateSchema = Yup.object().shape({
  saleId: Yup.string().required('This is a required field'),
  amount: Yup.string().required('This is a required field'),
  payer: Yup.string().required('This is a required field'),
  payerPhone: Yup.string().required('This is a required field'),
  comments: Yup.string().required('This is a required field')
})

type QueryParam = {
  id: string
}
const Add = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.payments)
  const [values] = useState<PaymentFields>({
    id: '',
    amount: '',
    payer: '',
    payerPhone: '',
    saleId: id,
    comments: ''
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

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
          message="Payment has been made successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/payments')
    }
  }, [store, history, values])

  const onSubmit = useCallback(
    (values: PaymentFields) => {
      dispatch(addPaymentRequest(values))
    },
    [dispatch]
  )

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
                    <CardTitle
                      tag="h2"
                      className="font-weight-light text-primary"
                    >
                      Add payment for {id}
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="saleId">
                        Sale ID <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="saleId"
                        placeholder="Enter sale ID"
                        value={values.saleId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="saleId"
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="amount">
                        Amount <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="amount"
                        placeholder="Enter amount to pay"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="amount"
                      />
                      {errors.amount && touched.amount ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.amount}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="payer">
                        Payer Name <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="payer"
                        placeholder="Enter name of payer"
                        value={values.payer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="payer"
                      />
                      {errors.payer && touched.payer ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.payer}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="payerPhone">
                        Payer Phone Number{' '}
                        <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        id="payerPhone"
                        placeholder="Enter phone number of payer"
                        value={values.payerPhone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="payerPhone"
                      />
                      {errors.payerPhone && touched.payerPhone ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.payerPhone}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="comments">
                        Comments
                      </Label>
                      <Input
                        type="textarea"
                        id="comments"
                        placeholder="Add comment"
                        value={values.comments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="comments"
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
                      <Collapse isOpen={!btnLoading}>Make Payment</Collapse>
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
