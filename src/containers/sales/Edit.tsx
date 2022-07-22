import { useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import saleActions from '@redux/sales/actions'
import { SaleFields, SaleStatus, Sale } from '@classes/index'
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
import { components } from 'react-select'
import SelectComponent from '@components/Select'

const { clearStates, setActiveLink, updateSaleRequest } = saleActions

const { Option } = components

type QueryParam = {
  id: string
}

const options = [
  {
    value: SaleStatus.PENDING,
    label: SaleStatus.PENDING
  },
  {
    value: SaleStatus.PAYING,
    label: SaleStatus.PAYING
  },
  {
    value: SaleStatus.PAID,
    label: SaleStatus.PAID
  },
  {
    value: SaleStatus.FAILED,
    label: SaleStatus.FAILED
  }
]

const selectOptions = [
  {
    label: 'Select Status of Order',
    options: options
  }
]

interface Fields {
  status: any
  comments: string
}

const validateSchema = Yup.object().shape({
  status: Yup.object().required('This is a required field')
})

const Edit = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.sales)
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)
  const [sale, setSale] = useState<Sale | null>(null)
  const [values] = useState(() => {
    const { sales } = store
    const item = sales.find((s) => s.id === id)
    const payload: Fields = {
      status: item ? { label: item.status, value: item.status } : '',
      comments: item ? item.comments : ''
    }
    if (item !== undefined) {
      setSale(item)
    }

    return payload
  })

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('edit'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: Fields) => {
      const payload: SaleFields = {
        status: values.status.value,
        id: id,
        comments: values.comments,
        orderId: sale ? sale.orderId : '',
        invoiceId: sale ? sale.invoiceId : '',
        amount: sale ? sale.amount : '',
        amountPaid: sale ? sale.amountPaid : '',
        amountLeft: sale ? sale.amountLeft : ''
      }
      dispatch(updateSaleRequest(payload))
    },
    [dispatch, id, sale]
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
          message="Sales has been updated successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/sales')
    }
  }, [store, history])

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
                    Update Sale {sale ? sale.id : null}
                  </CardTitle>
                </Col>
              </Row>
              {err ? renderError(err) : null}
              <Row className="px-3">
                <Col sm="12" md="6" lg="6">
                  <FormGroup>
                    <Label className="form-label" for="status">
                      Status <span style={{ color: '#ff0000' }}>*</span>
                    </Label>
                    <SelectComponent
                      id="status"
                      name="status"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.status}
                      touched={touched.status}
                      options={selectOptions}
                      optionComponent={OptionComponent}
                      value={values.status}
                      placeholder="Select Status.."
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
                    <Collapse isOpen={!btnLoading}>Update Order</Collapse>
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
