import { useState, useCallback, Fragment } from 'react'
import SearchBar from 'containers/manufacturers/SearchBar'
import Sidebar from 'containers/manufacturers/Sidebar'
import classnames from 'classnames'
import 'core/scss/react/apps/app-todo.scss'
import ManufacturerRoutes from './routes'

const Manufacturers = () => {
  const [query, setQuery] = useState('')
  const [mainSidebar, setMainSidebar] = useState(false)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)

  const handleFilter = useCallback(() => {}, [])
  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )
  const handleTaskSidebar = useCallback(
    () => setOpenTaskSidebar(!openTaskSidebar),
    [openTaskSidebar]
  )

  const handleSort = useCallback((value: string) => {}, [])

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
              <SearchBar
                handleFilter={handleFilter}
                query={query}
                handleMainSidebar={handleMainSidebar}
                handleSort={handleSort}
              />
              <ManufacturerRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Manufacturers
