import { useState, useCallback, Fragment } from 'react'
import SearchBar from '@containers/categories/Searchbar'
import Sidebar from '@containers/categories/Sidebar'
import classnames from 'classnames'
import '@core/scss/react/apps/app-todo.scss'
import CategoryRoutes from './routes'

const Categories = () => {
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
              <CategoryRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Categories
