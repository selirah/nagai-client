import { lazy } from 'react'
import { Route } from 'classes'

const TemplateTitle = '%s - NAGAI'
const DefaultRoute = '/'

const Routes: Route[] = [
  {
    path: '/',
    component: lazy(() => import('pages/home/Home')),
    exact: true
  },
  {
    path: '/admin/home',
    component: lazy(() => import('pages/home/Home')),
    exact: true
  },
  {
    path: '/auth/login',
    component: lazy(() => import('pages/auth/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('pages/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
