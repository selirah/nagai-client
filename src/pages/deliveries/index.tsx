import { useState, useCallback, Fragment, useEffect } from 'react'
import Sidebar from 'containers/deliveries/Sidebar'
import SearchBar from 'containers/deliveries/SearchBar'
import classnames from 'classnames'
import DeliveriesRoutes from './routes'
import 'core/scss/react/apps/app-todo.scss'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux/selector-dispatch'
import utilsActions from 'redux/utils/actions'
import { userRoles } from 'utils/ability'

const { getUsersRequest } = utilsActions

const Deliveries = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersRequest(userRoles.dispatch))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )

  return (
    <Fragment>
      <Sidebar mainSidebar={mainSidebar} />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames('body-content-overlay', {
                show: mainSidebar === true
              })}
              onClick={handleMainSidebar}
            ></div>
            <div className="todo-app-list">
              <SearchBar handleMainSidebar={handleMainSidebar} />
              <DeliveriesRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Deliveries
