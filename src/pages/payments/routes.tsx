import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from 'classes'
import Spinner from 'components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('containers/payments/List')),
    exact: true
  },
  {
    path: 'add/:id',
    component: lazy(() => import('containers/payments/Add')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('containers/payments/Edit')),
    exact: true
  }
]

const PaymentsRoutes = () => {
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

export default PaymentsRoutes
