import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from 'containers/manufacturers/SearchBar'
import Sidebar from 'containers/manufacturers/Sidebar'
import classnames from 'classnames'
import 'core/scss/react/apps/app-todo.scss'
import ManufacturerRoutes from './routes'
import categoriesActions from 'redux/categories/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import { isEmpty } from 'utils'

const { getCategoriesRequest } = categoriesActions

const Manufacturers = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.categories)

  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )
  const handleTaskSidebar = useCallback(
    () => setOpenTaskSidebar(!openTaskSidebar),
    [openTaskSidebar]
  )

  useEffect(() => {
    const { categories } = store
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
