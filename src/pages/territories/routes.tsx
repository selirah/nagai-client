import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/territories/List')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('@containers/territories/Add')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('@containers/territories/Edit')),
    exact: true
  }
]

const TerritoryRoutes = () => {
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

export default TerritoryRoutes
