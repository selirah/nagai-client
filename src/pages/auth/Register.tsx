import { useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import RegisterForm from 'containers/auth/RegisterForm'
import { RegisterFields } from 'classes'
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

const { registerRequest, clearStates } = authActions

const Register = () => {
  const { isAuthenticated, isSubmitting, errors, user, isRegistered } =
    Selector((state) => state.auth)
  const dispatch: Dispatch = useDispatch()
  const history = useHistory()
  const [mode] = useLayoutMode()
  const initialValues: RegisterFields = {
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    terms: false
  }
  const illustration =
    mode === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg'
  const source = require(`assets/images/pages/${illustration}`).default

  const onRegisterSubmit = useCallback(
    (values: RegisterFields) => {
      dispatch(registerRequest(values))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isAuthenticated) {
      history.push(PRIVATE_ROUTES.HOME)
    } else {
      dispatch(clearStates())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isRegistered && user) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="You have successfully registered. Enter the code that was sent to
          you via email and sms into the box below to verify your account.
          This code expires after 24 hours"
          title="Nice!"
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
      history.push(PUBLIC_ROUTES.VERIFY_ACCOUNT)
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
  }, [isRegistered, user, history, errors])

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to={PRIVATE_ROUTES.HOME}>
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
            <CardTitle tag="h2" className="font-weight-bolder mb-1">
              Sign up
            </CardTitle>
            <CardText className="mb-2 text-muted">
              Enter your details to register
            </CardText>
            <RegisterForm
              initialValues={initialValues}
              isSubmitting={isSubmitting}
              onSubmit={onRegisterSubmit}
            />
            <div className="d-flex justify-content-between mt-2">
              <Label className="form-label" for="login-password">
                Have account?
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

export default Register
