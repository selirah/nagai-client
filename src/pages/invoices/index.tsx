import { useState, useCallback, Fragment, useEffect } from 'react'
import Sidebar from 'containers/invoices/Sidebar'
import SearchBar from 'containers/invoices/SearchBar'
import classnames from 'classnames'
import InvoicesRoutes from './routes'
import 'core/scss/react/apps/app-todo.scss'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux/selector-dispatch'
import utilsActions from 'redux/utils/actions'

const Invoices = () => {
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
              <InvoicesRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Invoices
