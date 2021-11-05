import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'
// import abilities from 'router/can.constants'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/manufacturers/List')),
    exact: true
  },
  {
    path: 'add',
    component: lazy(() => import('@containers/manufacturers/Add')),
    exact: true
  },
  {
    path: 'edit/:id',
    component: lazy(() => import('@containers/manufacturers/Edit')),
    exact: true
  }
]

const ManufacturerRoutes = () => {
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

export default ManufacturerRoutes
