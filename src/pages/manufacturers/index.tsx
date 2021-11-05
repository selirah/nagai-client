import { useState, useCallback, Fragment } from 'react'
import SearchBar from '@containers/manufacturers/SearchBar'
import Sidebar from '@containers/manufacturers/Sidebar'
import classnames from 'classnames'
import '@core/scss/react/apps/app-todo.scss'
import ManufacturerRoutes from './routes'

const Manufacturers = () => {
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
              <ManufacturerRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Manufacturers
