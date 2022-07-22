import { useState, useCallback, Fragment } from 'react'
import SearchBar from '@containers/products/SearchBar'
import Sidebar from '@containers/products/Sidebar'
import classnames from 'classnames'
import ProductRoutes from './routes'
import '@core/scss/react/apps/app-todo.scss'

const Products = () => {
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
              <ProductRoutes />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Products
