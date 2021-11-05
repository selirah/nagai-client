import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import productActions from '@redux/products/actions'
import { Product } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, Trash, AlertTriangle } from 'react-feather'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from '@utils/index'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from '@components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'

const {
  getProductsRequest,
  clearStates,
  setActiveLink,
  deleteProductRequest,
  setProduct,
  setQueryParams
} = productActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.products)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)

  useEffect(() => {
    const { params } = store
    params.category = 0
    params.manufacturer = 0
    params.skip = 0
    params.query = ''
    dispatch(setQueryParams(params))
    dispatch(getProductsRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: string, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteProductRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Product ID',
        sortable: true,
        selector: (row: Product) => row.id
      },
      {
        id: 2,
        name: 'Name',
        sortable: true,
        selector: (row: Product) => row.productName
      },
      {
        id: 3,
        name: 'Category',
        sortable: true,
        selector: (row: Product) => row.category.category
      },
      {
        id: 4,
        name: 'Manufacturer',
        sortable: true,
        selector: (row: Product) => row.manufacturer.name
      },
      {
        id: 8,
        name: 'Created Date',
        sortable: true,
        selector: (row: Product) => moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 9,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Product) => moment(row.updatedAt).format("MMM Do, 'YY")
      },
      {
        cell: (row: Product) => (
          <Fragment>
            <Link to={`/admin/products/edit/${row.id}`}>
              <Edit3
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#40C4FF"
              />
            </Link>
            <Trash
              size={14}
              style={{ outline: 'none' }}
              color="#F44336"
              className="cursor-pointer"
              onClick={() => handleDelete(row.id, row.productName)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  useEffect(() => {
    const { loading, products, isDeleted, errors, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (products.length) {
      setProducts(products)
      setTotalRows(count)
    } else {
      setProducts(products)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Product')).then(function (res) {
        if (res.value) {
          dispatch(clearStates())
        }
      })
    }
    if (errors) {
      toast.error(
        <ToastBox
          color="danger"
          icon={<AlertTriangle />}
          message={JSON.stringify(errors)}
          title="Ooops . . ."
        />,
        { transition: Slide, hideProgressBar: true, autoClose: 5000 }
      )
    }
    setMode(mode)
  }, [store, sweetAlert, dispatch, pageSize, layoutStore])

  const handlePageClick = useCallback(
    (page: number) => {
      const { params } = store
      if (page > currentPage) {
        params.skip = params.skip + pageSize
      } else if (page < currentPage) {
        params.skip = params.skip - pageSize
      }
      setCurrentPage(page)
      dispatch(setQueryParams(params))
      dispatch(getProductsRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getProductsRequest(params))
    },
    [dispatch, store]
  )

  const handleProductSelection = useCallback(
    (product: Product) => {
      dispatch(setProduct(product))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={products}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleProductSelection}
      pageSize={pageSize}
      server
      theme={mode}
      totalRows={totalRows}
    />
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        <PerfectScrollbar
          options={{ wheelPropagation: false }}
          containerRef={(ref: any) => {
            if (ref) {
              ref._getBoundingClientRect = ref.getBoundingClientRect
              ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect()

                return { ...original, height: Math.floor(original.height) }
              }
            }
          }}
        >
          {renderList()}
        </PerfectScrollbar>
      </div>
      {store.product ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
