import { useState, useCallback, Fragment, useEffect } from 'react'
import Sidebar from 'containers/orders/Sidebar'
import SearchBar from 'containers/orders/SearchBar'
import classnames from 'classnames'
import OrdersRoutes from './routes'
import 'core/scss/react/apps/app-todo.scss'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux/selector-dispatch'
import utilsActions from 'redux/utils/actions'

const { getOutletsRequest } = utilsActions

const Orders = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOutletsRequest())
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
              <OrdersRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Orders
