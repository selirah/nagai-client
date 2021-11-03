import {
  useEffect,
  useState,
  useCallback,
  Fragment,
  lazy,
  Suspense
} from 'react'
import Sidebar from 'containers/home/Sidebar'
import categoriesActions from 'redux/categories/actions'
import manufacturerActions from 'redux/manufacturers/actions'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import { isEmpty } from 'utils'
import classnames from 'classnames'
import 'core/scss/react/apps/app-todo.scss'
import Spinner from 'components/Spinner'

const { getCategoriesRequest } = categoriesActions
const { getManufacturersRequest } = manufacturerActions

const Orders = lazy(() => import('containers/home/Orders'))
const Deliveries = lazy(() => import('containers/home/Deliveries'))
const Sales = lazy(() => import('containers/home/Sales'))
const Payments = lazy(() => import('containers/home/Payments'))
const Invoices = lazy(() => import('containers/home/Invoices'))
const Stock = lazy(() => import('containers/home/Stock'))
const Manufacturers = lazy(() => import('containers/home/Manufacturers'))
const Outlets = lazy(() => import('containers/home/Outlets'))
const Products = lazy(() => import('containers/home/Products'))
const Territories = lazy(() => import('containers/home/Territories'))

const Home = () => {
  const dispatch: Dispatch = useDispatch()
  const { categories } = Selector((state) => state.categories)
  const { manufacturers } = Selector((state) => state.manufacturers)
  const { activeLink } = Selector((state) => state.home)
  const [mainSidebar, setMainSidebar] = useState(false)

  useEffect(() => {
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    if (isEmpty(manufacturers)) {
      dispatch(getManufacturersRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMainSidebar = useCallback(
    () => setMainSidebar(!mainSidebar),
    [mainSidebar]
  )

  const renderView = () => {
    switch (activeLink) {
      case 'orders':
        return <Orders />
      case 'deliveries':
        return <Deliveries />
      case 'sales':
        return <Sales />
      case 'payments':
        return <Payments />
      case 'manufacturers':
        return <Manufacturers />
      case 'invoices':
        return <Invoices />
      case 'stock':
        return <Stock />
      case 'outlets':
        return <Outlets />
      case 'products':
        return <Products />
      case 'territories':
        return <Territories />
    }
  }

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
              <Suspense fallback={<Spinner />}>{renderView()}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
