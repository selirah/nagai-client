import { useEffect, useState, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import deliveryActions from 'redux/deliveries/actions'
import { DeliveryFields, OptionKey } from 'classes'
import { toast, Slide } from 'react-toastify'
import RippleButton from 'core/components/ripple-button'
import ToastBox from 'components/ToastBox'
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
import { useHistory, useParams } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { components } from 'react-select'
import SelectComponent from 'components/Select'

const { updateDeliveryRequest, clearStates, setActiveLink } = deliveryActions

type QueryParam = {
  id: string
}

const { Option } = components

interface Fields {
  orderId: string
  dispatchId: any
  isDelivered: boolean
}

const validateSchema = Yup.object().shape({
  orderId: Yup.string().required('This is a required field'),
  dispatchId: Yup.object().required('This is a required field')
})

const Edit = () => {
  const { id } = useParams<QueryParam>()
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.deliveries)
  const { users } = Selector((state) => state.utils)
  const [values] = useState(() => {
    const { deliveries } = store
    const item = deliveries.find((d) => d.id === id)
    const payload: Fields = {
      orderId: item ? item.orderId : '',
      dispatchId: item
        ? {
            label: `${item.dispatch.firstName.toUpperCase()} ${item.dispatch.lastName.toUpperCase()}`,
            value: item.dispatch.id
          }
        : '',
      isDelivered: item ? item.isDelivered : false
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
    (values: Fields) => {
      const payload: DeliveryFields = {
        dispatchId: parseInt(values.dispatchId.value),
        orderId: values.orderId,
        id: id,
        isDelivered: values.isDelivered
      }
      dispatch(updateDeliveryRequest(payload))
    },
    [dispatch, id]
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

  const dispatchOptions: OptionKey[] = []

  users.map((u) => {
    dispatchOptions.push({
      value: `${u.id}`,
      label: `${u.firstName.toUpperCase()} ${u.lastName.toUpperCase()}`
    })
    return dispatchOptions
  })

  const selectOptions = [
    {
      label: 'Select Dispatch for Order',
      options: dispatchOptions
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
                  <CardTitle
                    tag="h2"
                    className="font-weight-light text-secondary font-weight-bold"
                  >
                    Update delivery details
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="orderId">
                      Order Number <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      id="orderId"
                      placeholder="order ID"
                      value={values.orderId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="orderId"
                      disabled
                    />
                    {errors.orderId && touched.orderId ? (
                      <small style={{ color: '#ff0000' }}>
                        {errors.orderId}
                      </small>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="dispatchId">
                      Dispatch <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <SelectComponent
                      id="dispatchId"
                      name="dispatchId"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.dispatchId}
                      touched={touched.dispatchId}
                      options={selectOptions}
                      optionComponent={OptionComponent}
                      value={values.dispatchId}
                      placeholder="Select dispatch rider.."
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3 mb-2">
                <Col sm="4" md="4" lg="4">
                  <RippleButton type="submit" color="secondary" block>
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

export default Edit
