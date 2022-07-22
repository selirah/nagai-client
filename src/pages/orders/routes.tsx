import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/orders/List')),
    exact: true
  },
  {
    path: 'product-stock/:id',
    component: lazy(() => import('@containers/orders/ProductStock')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('@containers/orders/Add')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('@containers/orders/Edit')),
    exact: true
  },
  {
    path: 'add-invoice/:id',
    component: lazy(() => import('@containers/orders/AddInvoice')),
    exact: true
  },
  {
    path: 'assign-dispatch/:id',
    component: lazy(() => import('@containers/orders/AssignDispatch')),
    exact: true
  }
]

const OrdersRoutes = () => {
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

export default OrdersRoutes
