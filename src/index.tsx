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
import { getItem } from 'utils/localstorage'
import { User } from 'classes'
import { removeAll } from 'utils/localstorage'
import jwtDecode from 'jwt-decode'
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
  authorization(token)
  const user: User = jwtDecode(JSON.stringify({ token }))
  store.dispatch(setCurrentUser(user))
  const currentTime = Date.now() / 1000

  if (user.exp < currentTime) {
    removeAll()
    store.dispatch(logout())
    window.location.href = PUBLIC_ROUTES.SIGN_IN
  }
}

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <LocaleWrapper>
          <LazyApp store={store} persistor={persistor} />
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
