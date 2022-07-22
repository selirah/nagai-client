import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from '@containers/stock/SearchBar'
import Sidebar from '@containers/stock/Sidebar'
import classnames from 'classnames'
import StockRoutes from './routes'
import '@core/scss/react/apps/app-todo.scss'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import { isEmpty } from '@utils/index'
import utilsActions from '@redux/utils/actions'

const { getUnitRequest } = utilsActions

const Stock = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const { units } = Selector((state) => state.utils)

  useEffect(() => {
    if (isEmpty(units)) {
      dispatch(getUnitRequest())
    }
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
              <StockRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Stock
