import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginForm from '@containers/auth/LoginForm'
import { LoginFields } from '@classes/index'
import authActions from '@redux/auth/actions'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@router/constants'
import { useLayoutMode } from '@hooks/index'
import { Row, Col, CardTitle, CardText } from 'reactstrap'
import RippleButton from '@core/components/ripple-button'
import Logo from './Logo'
import '@core/scss/base/pages/page-auth.scss'
import { FormattedMessage } from 'react-intl'
import themeConfig from '@theme/themeConfig'
import ReCAPTCHA from 'react-google-recaptcha'

const { loginRequest, clearStates } = authActions

const SITE_KEY = process.env.REACT_APP_SITE_KEY
const DELAY = 1500

const Login = () => {
  const store = Selector((state) => state.auth)
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
  const source = require(`@assets/images/pages/${illustration}`).default
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState(null)
  const [load, setLoad] = useState(false)
  const [expired, setExpired] = useState(false)
  const reCaptchaRef = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)

  const onLoginSubmit = useCallback(
    (values: LoginFields) => {
      reCaptchaRef.current
        .executeAsync()
        .then((value: string) => {
          if (value && !expired) {
            dispatch(loginRequest(values))
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    [dispatch, expired]
  )

  useEffect(() => {
    const { isAuthenticated } = store
    if (isAuthenticated) {
      setRedirectToReferrer(true)
    }

    setTimeout(() => {
      setLoad(true)
    }, DELAY)
    return () => {
      setIsMounted(!isMounted)
      dispatch(clearStates())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { isAuthenticated, isSubmitting, errors, user } = store
    setIsSubmitting(isSubmitting)
    setErrors(errors)
    if (isAuthenticated && user) {
      setRedirectToReferrer(true)
    }
  }, [store])

  let { from } = location.state || {
    from: { pathname: PRIVATE_ROUTES.HOME }
  }

  if (redirectToReferer && store.user) {
    window.location.href = from.pathname
  }

  const handleRecaptcha = useCallback((value) => {
    if (value === null) setExpired(true)
  }, [])

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
              <FormattedMessage id="Login" />
            </CardTitle>
            <CardText className="mb-2 text-muted">
              <FormattedMessage id="Please sign-in to your account" />
            </CardText>
            {load && (
              <ReCAPTCHA
                theme={mode}
                size="invisible"
                ref={reCaptchaRef}
                sitekey={`${SITE_KEY}`}
                onChange={handleRecaptcha}
              />
            )}
            <LoginForm
              initialValues={initialValues}
              isSubmitting={isSubmitting}
              onSubmit={onLoginSubmit}
              errs={errors}
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
