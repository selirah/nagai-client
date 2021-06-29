import { Suspense, useContext, lazy } from 'react'
import { Selector } from 'redux/selector-dispatch'
import { useLayout, useRouterTransition } from 'hooks'
import { AbilityContext } from 'contexts/Can'
import LayoutWrapper from 'core/layouts/components/layout-wrapper'
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { DefaultRoute, Routes } from './router.constants'
import BlankLayout from 'core/layouts/BlankLayout'
import HorizontalLayout from 'layouts/HorizontalLayout'
import VerticalLayout from 'layouts/VerticalLayout'
import { Route as R } from 'classes'

const Router = () => {
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()
  const ability = useContext(AbilityContext)
  const DefaultLayout =
    layout === 'horizontal' ? 'HorizontalLayout' : 'VerticalLayout'
  const Layouts: any = { BlankLayout, VerticalLayout, HorizontalLayout }
  const currentActiveItem = null
  const authStore = Selector((state) => state.auth)
  const { isAuthenticated } = authStore

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout: string) => {
    const LayoutRoutes: R[] = []
    const LayoutPaths: string[] = []

    if (Routes) {
      Routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('pages/NotAuthorized'))

  const Error = lazy(() => import('pages/Error'))

  /**
   ** Final Route Component Checks for Login & User Role and then redirects to the route
   */
  const FinalRoute = (props: any) => {
    const route: R = props.route
    let action, resource

    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }

    if (
      (!isAuthenticated && route.meta === undefined) ||
      (!isAuthenticated &&
        route.meta &&
        !route.meta.authRoute &&
        !route.meta.publicRoute)
    ) {
      /**
       ** If user is not Logged in & route meta is undefined
       ** OR
       ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then redirect user to login
       */
      return <Redirect to="/auth/login" />
    } else if (route.meta && route.meta.authRoute && isAuthenticated) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to="/" />
    } else if (isAuthenticated && !ability.can(action || 'read', resource)) {
      // ** If user is Logged in and doesn't have ability to visit the page redirect the user to Not Authorized
      return <Redirect to="/misc/not-authorized" />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal
      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps: any = {}
      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, { ...props, meta: route.meta })

                      return (
                        <Suspense fallback={null}>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            /* Conditional props */
                            {...(route.appLayout
                              ? { appLayout: route.appLayout }
                              : {})}
                            {...(route.meta ? { routeMeta: route.meta } : {})}
                            {...(route.className
                              ? { wrapperClass: route.className }
                              : {})}
                          >
                            <route.component {...props} />
                            <FinalRoute route={route} {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      )
                    }}
                  />
                )
              })}
            </Switch>
          </LayoutTag>
        </Route>
      )
    })
  }
  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>
        {/* If user is logged in Redirect user to DefaultRoute else to login */}
        <Route
          exact
          path="/"
          render={() => {
            return isAuthenticated ? (
              <Redirect to={DefaultRoute} />
            ) : (
              <Redirect to="/auth/login" />
            )
          }}
        />
        {/* Not Auth Route */}
        <Route
          exact
          path="/misc/not-authorized"
          render={(props) => (
            <Layouts.BlankLayout>
              <NotAuthorized />
            </Layouts.BlankLayout>
          )}
        />
        {ResolveRoutes()}
        {/* NotFound Error page */}
        <Route path="*" component={Error} />
      </Switch>
    </AppRouter>
  )
}

export default Router
