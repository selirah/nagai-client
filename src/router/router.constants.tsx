import { lazy } from 'react'
import { Route } from 'classes'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './constants'

const TemplateTitle = '%s - NAGAI'
const DefaultRoute = PRIVATE_ROUTES.HOME

const Routes: Route[] = [
  {
    path: PRIVATE_ROUTES.HOME,
    component: lazy(() => import('pages/home')),
    exact: true
  },
  {
    path: PUBLIC_ROUTES.SIGN_IN,
    component: lazy(() => import('pages/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.SIGN_UP,
    component: lazy(() => import('pages/auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.VERIFY_ACCOUNT,
    component: lazy(() => import('pages/auth/Verify')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.FORGOT_PASSWORD,
    component: lazy(() => import('pages/auth/Forgotten')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.ERROR,
    component: lazy(() => import('pages/Error')),
    layout: 'BlankLayout'
  },
  {
    path: PRIVATE_ROUTES.MANUFACTURERS,
    component: lazy(() => import('pages/manufacturers')),
    exact: false,
    className: 'todo-application',
    appLayout: true
  },
  {
    path: PRIVATE_ROUTES.PRODUCTS,
    component: lazy(() => import('pages/products')),
    exact: false,
    className: 'todo-application',
    appLayout: true
  }
]

export { DefaultRoute, TemplateTitle, Routes }
