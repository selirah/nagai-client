import { useState, useCallback, Fragment } from 'react'
import Sidebar from '@containers/payments/Sidebar'
import SearchBar from '@containers/payments/SearchBar'
import classnames from 'classnames'
import PaymentsRoutes from './routes'
import '@core/scss/react/apps/app-todo.scss'

const Payments = () => {
  const [mainSidebar, setMainSidebar] = useState(false)

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
              <PaymentsRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Payments
