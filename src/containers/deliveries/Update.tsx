import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import deliveryActions from '@redux/deliveries/actions'
import { DeliveryFields } from '@classes/index'
import { toast, Slide } from 'react-toastify'
import RippleButton from '@core/components/ripple-button'
import ToastBox from '@components/ToastBox'
import { Formik } from 'formik'
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
  Alert,
  CustomInput
} from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const { updateDeliveryRequest, clearStates, setActiveLink } = deliveryActions

type QueryParam = {
  id: string
}

const Update = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.deliveries)
  const [values] = useState(() => {
    const { deliveries } = store
    const item = deliveries.find((d) => d.id === id)
    const payload: DeliveryFields = {
      orderId: item ? item.orderId : '',
      dispatchId: item ? item.dispatchId : 0,
      isDelivered: item ? item.isDelivered : false,
      id: id,
      comments: item ? item.comments : ''
    }
    return payload
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('edit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: DeliveryFields) => {
      dispatch(updateDeliveryRequest(values))
    },
    [dispatch]
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
          message="Delivery has been updated successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/deliveries')
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
        <Formik initialValues={values} onSubmit={(values) => onSubmit(values)}>
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form className="mt-2" onSubmit={handleSubmit}>
              <Row className="px-3">
                <Col sm="12" md="12" lg="12">
                  <CardTitle
                    tag="h2"
                    className="font-weight-light text-primary font-weight-bold"
                  >
                    Update delivery details
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <Label className="form-label" for="isDelivered">
                    Delivery status
                  </Label>
                  <FormGroup>
                    <CustomInput
                      type="switch"
                      className="custom-control-Primary"
                      id="isDelivered"
                      label="Switch if order has been successfully delivered"
                      name="isDelivered"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.isDelivered}
                      disabled={values.isDelivered}
                    />
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
                      placeholder="Type any comment related to this order delivery"
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
                    <Collapse isOpen={!btnLoading}>Update</Collapse>
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

export default Update
