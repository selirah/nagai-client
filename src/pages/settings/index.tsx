import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from '@containers/settings/SearchBar'
import Sidebar from '@containers/settings/Sidebar'
import classnames from 'classnames'
import '@core/scss/react/apps/app-todo.scss'
import SettingsRoutes from './routes'
import userActions from '@redux/users/actions'
import { Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'

const { getCompanyRequest } = userActions

const Settings = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanyRequest())
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
              <SettingsRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Settings
