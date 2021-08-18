import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { configureStore } from 'redux/store'
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from 'contexts/Theme'
import { LocaleWrapper } from 'contexts/i18n'
import { PUBLIC_ROUTES } from 'router/constants'
import { authorization } from 'utils/authorization'
import authActions from 'redux/auth/actions'
import { getItem, removeItem, removeAll } from 'utils/localstorage'
import { User } from 'classes'
import jwtDecode from 'jwt-decode'
import { AbilityContext } from 'contexts/Can'
import ability from 'utils/ability'
import moment from 'moment'
// ** Spinner (Splash Screen)
import Spinner from 'core/components/spinner/fallback'
// ** Ripple Button
import 'core/components/ripple-button'
// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'
// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'
// ** React Toastify
import 'core/scss/react/libs/toastify/toastify.scss'
// ** Core styles
import 'core/scss/core.scss'
import 'assets/scss/style.scss'

const { setCurrentUser, logout } = authActions

declare global {
  interface Window {
    INITIAL_REDUX_STATE: any
  }
}

const initialState = window.INITIAL_REDUX_STATE

export const { store, persistor } = configureStore(initialState)

const token = getItem('token')

if (token) {
  const user: User = jwtDecode(JSON.stringify({ token }))
  const d = new Date(0)
  d.setUTCSeconds(user.exp)
  const futureTime = moment(d).format('X')
  const currentTime = moment(new Date()).format('X')

  if (futureTime > currentTime) {
    authorization(token)
    store.dispatch(setCurrentUser(user))
  } else {
    store.dispatch(logout())
    removeItem('user')
    removeItem('token')
    removeItem('persist:root')
    removeAll()
    window.location.href = PUBLIC_ROUTES.SIGN_IN
  }
}

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <LocaleWrapper>
          <AbilityContext.Provider value={ability()}>
            <LazyApp store={store} persistor={persistor} />
          </AbilityContext.Provider>
          <ToastContainer newestOnTop />
        </LocaleWrapper>
      </ThemeContext>
    </Suspense>
  </React.Fragment>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
