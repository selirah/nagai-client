import { useState, useEffect, useCallback, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import VerifyForm from 'containers/auth/VerifyForm'
import { VerifyFields, ResetResendFields } from 'classes'
import authActions from 'redux/auth/actions'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'router/constants'
import { useLayoutMode, useTimer } from 'hooks'
import { Coffee } from 'react-feather'
import { toast, Slide } from 'react-toastify'
import { Row, Col, CardTitle, CardText, Label, Spinner } from 'reactstrap'
import Logo from './Logo'
import 'core/scss/base/pages/page-auth.scss'
import themeConfig from 'theme/themeConfig'
import ToastBox from 'components/ToastBox'
import ReCAPTCHA from 'react-google-recaptcha'

const { verificationRequest, clearStates, resendCodeRequest } = authActions

const SITE_KEY = process.env.REACT_APP_SITE_KEY
const DELAY = 1500

const Verify = () => {
  const store = Selector((state) => state.auth)
  const dispatch: Dispatch = useDispatch()
  const history = useHistory()
  const [mode] = useLayoutMode()
  const initialValues: VerifyFields = { code: '' }
  const [timeUp, setTimeUp] = useState(true)
  const { time, startTimer } = useTimer(60)
  const [isSubmitting, setIsSubmiting] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const [expired, setExpired] = useState(false)
  const reCaptchaRef = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)

  const illustration =
    mode === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg'
  const source = require(`assets/images/pages/${illustration}`).default

  const onVerifySubmit = useCallback(
    (values: VerifyFields) => {
      reCaptchaRef.current
        .executeAsync()
        .then((value: string) => {
          if (value && !expired) {
            dispatch(verificationRequest(values))
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    [dispatch, expired]
  )

  const resendCode = useCallback(async () => {
    const { user } = store
    if (user) {
      const payload: ResetResendFields = {
        email: user.email
      }
      dispatch(resendCodeRequest(payload))
    }
  }, [dispatch, store])

  useEffect(() => {
    const { isAuthenticated } = store
    if (isAuthenticated) {
      history.push(PRIVATE_ROUTES.HOME)
    } else {
      dispatch(clearStates())
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
    const { isSubmitting, errors, isVerified, loading, isResendCode } = store
    setLoading(loading)
    setIsSubmiting(isSubmitting)
    setErrors(errors)
    if (isVerified) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message=" You have successfully verified account. Proceed to login to admin"
          title="Nice!"
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
      history.push(PUBLIC_ROUTES.SIGN_IN)
    }
    if (isResendCode) {
      startTimer()
      setTimeUp(false)
    }
    if (time <= 0) {
      setTimeUp(true)
    }
  }, [store, history, startTimer, time])

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
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Verify your account
            </CardTitle>
            <CardText className="mb-2 text-muted">
              You have successfully registered. Enter the code that was sent to
              you via email and sms into the box below to verify your account.
              This code expires after 24 hours
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
            <VerifyForm
              initialValues={initialValues}
              isSubmitting={isSubmitting}
              onSubmit={onVerifySubmit}
              errs={errors}
            />
            <div className="d-flex justify-content-between mt-3">
              <Label className="form-label" for="login-password">
                {timeUp ? 'Did not receive code?' : 'Code sent!'}
              </Label>
              {timeUp ? (
                <Link to="#" onClick={() => resendCode()}>
                  <small>
                    Resend Code{' '}
                    {loading ? <Spinner color="indigo" size="sm" /> : null}
                  </small>
                </Link>
              ) : (
                <Link to="">
                  <small>{time}</small>
                </Link>
              )}
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Verify
