import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { configureStore } from 'redux/store'
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from 'contexts/Theme'
import { LocaleWrapper } from 'contexts/i18n'

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
declare global {
  interface Window {
    INITIAL_REDUX_STATE: any
  }
}

const initialState = window.INITIAL_REDUX_STATE

export const { store, persistor } = configureStore(initialState)

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <LocaleWrapper>
          <LazyApp store={store} persistor={persistor} />
          <ToastContainer newestOnTop />
        </LocaleWrapper>
      </ThemeContext>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
