import { lazy } from 'react'
import { Route } from 'classes'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './constants'
import abilities from './can.constants'

const TemplateTitle = '%s - NAGAI'
const DefaultRoute = PRIVATE_ROUTES.HOME

const Routes: Route[] = [
  {
    path: PRIVATE_ROUTES.HOME,
    component: lazy(() => import('pages/home')),
    exact: true,
    meta: {
      resource: abilities.Home,
      action: 'read'
    }
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
    appLayout: true,
    meta: {
      resource: abilities.Manufacturers,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.CATEGORIES,
    component: lazy(() => import('pages/categories')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Categories,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.PRODUCTS,
    component: lazy(() => import('pages/products')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Products,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.STOCK,
    component: lazy(() => import('pages/stock')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Stock,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.TERRITORIES,
    component: lazy(() => import('pages/territories')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Territories,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.OUTLETS,
    component: lazy(() => import('pages/outlets')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Outlets,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.USERS,
    component: lazy(() => import('pages/users')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Users,
      action: 'read'
    }
  }
]

export { DefaultRoute, TemplateTitle, Routes }
