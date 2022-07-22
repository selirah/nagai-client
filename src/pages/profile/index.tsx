import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from '@containers/profile/SearchBar'
import Sidebar from '@containers/profile/Sidebar'
import classnames from 'classnames'
import '@core/scss/react/apps/app-todo.scss'
import ProfileRoutes from './routes'
import userActions from '@redux/users/actions'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'

const { getUserRequest } = userActions

const Profile = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const store = Selector((state) => state.auth)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    const { user } = store
    dispatch(getUserRequest(user!.id))
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
              <ProfileRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
