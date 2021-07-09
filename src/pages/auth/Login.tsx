import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'
import LoginForm from 'containers/auth/LoginForm'
import { LoginFields } from 'classes'
import authActions from 'redux/auth/actions'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'router/constants'
import { useLayoutMode } from 'hooks'
import { AlertTriangle, Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'
import { Row, Col, CardTitle, CardText } from 'reactstrap'
import RippleButton from 'core/components/ripple-button'
import Logo from './Logo'
import 'core/scss/base/pages/page-auth.scss'
import { FormattedMessage } from 'react-intl'
import themeConfig from 'theme/themeConfig'
import ToastBox from 'components/ToastBox'

const { loginRequest, clearStates } = authActions

const Login = () => {
  const { isAuthenticated, isSubmitting, errors, user } = Selector(
    (state) => state.auth
  )
  const dispatch: Dispatch = useDispatch()
  const location = useLocation<any>()
  const initialValues: LoginFields = {
    email: '',
    password: '',
    rememberMe: false
  }
  const [redirectToReferer, setRedirectToReferrer] = useState(false)
  const [mode] = useLayoutMode()
  const illustration = mode === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  const source = require(`assets/images/pages/${illustration}`).default

  const onLoginSubmit = useCallback(
    (values: LoginFields) => {
      dispatch(loginRequest(values))
      dispatch(clearStates())
    },
    [dispatch]
  )

  useEffect(() => {
    if (isAuthenticated) {
      setRedirectToReferrer(true)
    }
    dispatch(clearStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isAuthenticated && user) {
      setRedirectToReferrer(true)
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message={`You have successfully logged in as ${user.role} to NAGAI. Enjoy!`}
          title={`Welcome, ${user.firstName ? user.firstName : user.email}`}
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
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
  }, [isAuthenticated, user, errors])

  let { from } = location.state || {
    from: { pathname: PRIVATE_ROUTES.HOME }
  }

  if (redirectToReferer) {
    return <Redirect to={from} />
  }

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
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              <FormattedMessage id="Welcome to NAGAI Admin" />
            </CardTitle>
            <CardText className="mb-2">
              <FormattedMessage id="Please sign-in to your account" />
            </CardText>
            <LoginForm
              initialValues={initialValues}
              isSubmitting={isSubmitting}
              onSubmit={onLoginSubmit}
            />
            <div className="divider my-2">
              <div className="divider-text">Don't have account?</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <RippleButton
                tag={Link}
                to={PUBLIC_ROUTES.SIGN_UP}
                color="secondary"
                block
              >
                Sign up
              </RippleButton>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
