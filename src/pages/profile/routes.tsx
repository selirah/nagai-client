import { lazy, Suspense } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import { Route as RR } from '@classes/index'
import Spinner from '@components/Spinner'

const routes: RR[] = [
  {
    path: '',
    component: lazy(() => import('@containers/profile/Edit')),
    exact: true
  },
  {
    path: 'change-password',
    component: lazy(() => import('@containers/profile/ChangePassword')),
    exact: true
  }
]

const ProfileRoutes = () => {
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

export default ProfileRoutes
