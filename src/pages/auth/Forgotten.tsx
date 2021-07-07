import { useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ForgottenForm from 'containers/auth/ForgottenForm'
import { ResetResendFields } from 'classes'
import authActions from 'redux/auth/actions'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'router/constants'
import { useLayoutMode } from 'hooks'
import { AlertTriangle, Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'
import { Row, Col, CardTitle, CardText, Label } from 'reactstrap'
import Logo from './Logo'
import 'core/scss/base/pages/page-auth.scss'
import themeConfig from 'theme/themeConfig'
import ToastBox from 'components/ToastBox'

const { resetPasswordRequest, clearStates } = authActions

const Forgotten = () => {
  const { isAuthenticated, isSubmitting, errors, isResetPassword } = Selector(
    (state) => state.auth
  )
  const dispatch: Dispatch = useDispatch()
  const history = useHistory()
  const [mode] = useLayoutMode()
  const initialValues: ResetResendFields = {
    email: ''
  }
  const illustration = mode === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  const source = require(`assets/images/pages/${illustration}`).default

  const onRequestPasswordSubmit = useCallback(
    (values: ResetResendFields) => {
      dispatch(resetPasswordRequest(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isAuthenticated) {
      history.push(PRIVATE_ROUTES.LANDING)
    } else {
      dispatch(clearStates())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isResetPassword) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="An email and sms have been sent to you for further instructions"
          title="Nice!"
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
      history.push(PUBLIC_ROUTES.SIGN_IN)
    }
    if (errors) {
      toast.error(
        <ToastBox
          color="danger"
          icon={<AlertTriangle />}
          message={`${errors.errors[0].message}`}
          title="Ooops . . ."
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
    }
  }, [isResetPassword, history, errors])

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to={PRIVATE_ROUTES.LANDING}>
          <Logo />
          <h2 className="brand-text text-primary ml-1">
            {themeConfig.app.appName}
          </h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Forgotten Password
            </CardTitle>
            <CardText className="mb-2">
              Enter your email and receive instruction on resetting your
              password
            </CardText>
            <ForgottenForm
              initialValues={initialValues}
              isSubmitting={isSubmitting}
              onSubmit={onRequestPasswordSubmit}
            />
            <div className="d-flex justify-content-between mt-2">
              <Label className="form-label" for="login-password">
                Remembered password?
              </Label>
              <Link to={PUBLIC_ROUTES.SIGN_IN}>
                <small>Sign in</small>
              </Link>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Forgotten
