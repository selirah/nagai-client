import { lazy } from 'react'
import { Route } from '@classes/Route'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from './constants'
import abilities from './can.constants'

const TemplateTitle = '%s - NAGAI'
const DefaultRoute = PRIVATE_ROUTES.HOME

const Routes: Route[] = [
  {
    path: PRIVATE_ROUTES.HOME,
    component: lazy(() => import('@pages/home')),
    exact: true,
    meta: {
      resource: abilities.Home,
      action: 'read'
    }
  },
  {
    path: PUBLIC_ROUTES.SIGN_IN,
    component: lazy(() => import('@pages/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.SIGN_UP,
    component: lazy(() => import('@pages/auth/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.VERIFY_ACCOUNT,
    component: lazy(() => import('@pages/auth/Verify')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.FORGOT_PASSWORD,
    component: lazy(() => import('@pages/auth/Forgotten')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: PUBLIC_ROUTES.ERROR,
    component: lazy(() => import('@pages/Error')),
    layout: 'BlankLayout'
  },
  {
    path: PRIVATE_ROUTES.MANUFACTURERS,
    component: lazy(() => import('@pages/manufacturers')),
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
    component: lazy(() => import('@pages/categories')),
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
    component: lazy(() => import('@pages/products')),
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
    component: lazy(() => import('@pages/stock')),
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
    component: lazy(() => import('@pages/territories')),
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
    component: lazy(() => import('@pages/outlets')),
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
    component: lazy(() => import('@pages/users')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Users,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.ORDERS,
    component: lazy(() => import('@pages/orders')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Orders,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.INVOICES,
    component: lazy(() => import('@pages/invoices')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Invoices,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.DELIVERIES,
    component: lazy(() => import('@pages/deliveries')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Deliveries,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.SALES,
    component: lazy(() => import('@pages/sales')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Sales,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.PAYMENTS,
    component: lazy(() => import('@pages/payments')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Payments,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.PROFILE,
    component: lazy(() => import('@pages/profile')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Profile,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    component: lazy(() => import('@pages/settings')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Settings,
      action: 'read'
    }
  },
  {
    path: PRIVATE_ROUTES.REPORTS,
    component: lazy(() => import('@pages/reports')),
    exact: false,
    className: 'todo-application',
    appLayout: true,
    meta: {
      resource: abilities.Reports,
      action: 'read'
    }
  }
]

export { DefaultRoute, TemplateTitle, Routes }
