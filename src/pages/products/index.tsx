import { useState, useCallback, Fragment, useEffect } from 'react'
import SearchBar from 'containers/manufacturers/SearchBar'
import Sidebar from 'containers/manufacturers/Sidebar'
import classnames from 'classnames'
import 'core/scss/react/apps/app-todo.scss'
import ProductRoutes from './routes'
import categoriesActions from 'redux/categories/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import { isEmpty } from 'utils'

const { getCategoriesRequest } = categoriesActions

const Products = () => {
  const [mainSidebar, setMainSidebar] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.categories)

  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )

  useEffect(() => {
    const { categories } = store
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Fragment></Fragment>
}

export default Products
