import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/home/Orders')),
    exact: true
  },
  {
    path: 'sales',
    component: lazy(() => import('@containers/home/Sales')),
    exact: true
  },
  {
    path: 'deliveries',
    component: lazy(() => import('@containers/home/Deliveries')),
    exact: true
  },
  {
    path: 'payments',
    component: lazy(() => import('@containers/home/Payments')),
    exact: true
  },
  {
    path: 'products',
    component: lazy(() => import('@containers/home/Products')),
    exact: true
  },
  {
    path: 'stock',
    component: lazy(() => import('@containers/home/Stock')),
    exact: true
  },
  {
    path: 'invoices',
    component: lazy(() => import('@containers/home/Invoices')),
    exact: true
  },
  {
    path: 'outlets',
    component: lazy(() => import('@containers/home/Outlets')),
    exact: true
  },
  {
    path: 'manufacturers',
    component: lazy(() => import('@containers/home/Manufacturers')),
    exact: true
  },
  {
    path: 'territories',
    component: lazy(() => import('@containers/home/Territories')),
    exact: true
  }
]

const HomeRoutes = () => {
  const { url } = useRouteMatch()
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routes.map((route, index) => (
          <Route exact={route.exact} key={index} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  )
}

export default HomeRoutes
