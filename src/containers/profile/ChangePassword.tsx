import { useEffect, useState, useCallback, Fragment } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import userActions from 'redux/users/actions'
import { ChangePassword as CP } from 'classes'
import { toast, Slide } from 'react-toastify'
import RippleButton from 'core/components/ripple-button'
import ToastBox from 'components/ToastBox'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  FormGroup,
  Label,
  Spinner,
  Collapse,
  Row,
  Col,
  CardTitle,
  Alert
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { Coffee } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import InputPasswordToggle from 'core/components/input-password-toggle'

const { changePasswordRequest, clearStates, setActiveLink } = userActions

const validateSchema = Yup.object().shape({
  oldPassword: Yup.string().required('This is a required field'),
  newPassword: Yup.string().required('This is a required field')
})

const ChangePassword = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.users)
  const authStore = Selector((state) => state.auth)
  const [values] = useState<CP>({
    oldPassword: '',
    newPassword: '',
    id: authStore.user!.id
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const history = useHistory()
  const [err, setErr] = useState(null)

  useEffect(() => {
    dispatch(clearStates())
    dispatch(setActiveLink('add'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback(
    (values: CP) => {
      dispatch(changePasswordRequest(values))
    },
    [dispatch]
  )

  useEffect(() => {
    const { isSubmitting, changePassword, errors } = store
    setBtnLoading(isSubmitting)
    setErr(errors)
    if (changePassword) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Password has been changed successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/profile')
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
                    <CardTitle tag="h2" className="font-weight-light">
                      Change Password
                    </CardTitle>
                  </Col>
                </Row>
                {err ? renderError(err) : null}
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="oldPassword">
                        Old Password <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <InputPasswordToggle
                        id="oldPassword"
                        placeholder="Enter old password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="oldPassword"
                        className="input-group-merge"
                      />
                      {errors.oldPassword && touched.oldPassword ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.oldPassword}
                        </small>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="px-3">
                  <Col sm="12" md="6" lg="6">
                    <FormGroup>
                      <Label className="form-label" for="newPassword">
                        New Password <span style={{ color: '#ff0000' }}>*</span>
                      </Label>
                      <InputPasswordToggle
                        id="newPassword"
                        placeholder="Enter new password"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="newPassword"
                        className="input-group-merge"
                      />
                      {errors.newPassword && touched.newPassword ? (
                        <small style={{ color: '#ff0000' }}>
                          {errors.newPassword}
                        </small>
                      ) : null}
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
                      <Collapse isOpen={!btnLoading}>Change Password</Collapse>
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

export default ChangePassword
