import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from 'classes'
import Spinner from 'components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('containers/deliveries/List')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('containers/deliveries/Edit')),
    exact: true
  },
  {
    path: 'update/:id',
    component: lazy(() => import('containers/deliveries/Update')),
    exact: true
  }
]

const DeliveriesRoutes = () => {
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

export default DeliveriesRoutes
