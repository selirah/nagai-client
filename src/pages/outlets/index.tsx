import { useState, useCallback, Fragment } from 'react'
import SearchBar from 'containers/outlets/SearchBar'
import Sidebar from 'containers/outlets/Sidebar'
import classnames from 'classnames'
import OutletsRoutes from './routes'
import 'core/scss/react/apps/app-todo.scss'

const Outlets = () => {
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
              <OutletsRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Outlets
