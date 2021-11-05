import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/users/List')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('@containers/users/Add')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('@containers/users/Edit')),
    exact: true
  },
  {
    path: 'assign-territories/:id',
    component: lazy(() => import('@containers/users/AssignTerritories')),
    exact: true
  }
]

const UsersRoutes = () => {
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

export default UsersRoutes
