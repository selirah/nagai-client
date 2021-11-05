import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from '@containers/outlets/SearchBar'
import Sidebar from '@containers/outlets/Sidebar'
import classnames from 'classnames'
import OutletsRoutes from './routes'
import '@core/scss/react/apps/app-todo.scss'
import utilsActions from '@redux/utils/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import { isEmpty } from '@utils/index'
import { Territory } from '@classes/index'

const { getTerritoriesRequest, getRegionsRequest } = utilsActions

const Outlets = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const utilsStore = Selector((state) => state.utils)
  const [territories, setTerritories] = useState<Territory[]>([])

  useEffect(() => {
    if (isEmpty(utilsStore.territories)) {
      dispatch(getTerritoriesRequest())
    }
    if (isEmpty(utilsStore.regions)) {
      dispatch(getRegionsRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )

  useEffect(() => {
    const { territories } = utilsStore
    setTerritories(territories)
  }, [utilsStore])

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
                handleMainSidebar={handleMainSidebar}
                territories={territories}
              />
              <OutletsRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Outlets
