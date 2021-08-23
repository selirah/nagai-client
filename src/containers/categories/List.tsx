import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import categoriesActions from 'redux/categories/actions'
import { Category } from 'classes'
import { isEmpty } from 'utils'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, Trash, AlertTriangle } from 'react-feather'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

const {
  getCategoriesRequest,
  clearStates,
  setActiveLink,
  deleteCategoryRequest,
  setCategory
} = categoriesActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.categories)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    if (isEmpty(categories)) {
      dispatch(getCategoriesRequest())
    }
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: number, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteCategoryRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Category',
        sortable: true,
        selector: (row: Category) => row.category
      },
      {
        id: 2,
        name: 'Number of Products',
        sortable: true,
        selector: (row: Category) => row.products.length
      },
      {
        id: 3,
        name: 'Date Created',
        sortable: true,
        selector: (row: Category) => moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 4,
        name: 'Date Updated',
        sortable: true,
        selector: (row: Category) => moment(row.updatedAt).format("MMM Do, 'YY")
      },

      {
        cell: (row: Category) => (
          <Fragment>
            <Link to={`/admin/product-categories/edit/${row.id}`}>
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
              onClick={() => handleDelete(row.id, row.category)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  const handleCategorySelection = useCallback(
    (category: Category) => {
      dispatch(setCategory(category))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  useEffect(() => {
    const { loading, categories, searchText, isDeleted, errors, filtered } =
      store
    setLoading(loading)
    if (categories.length) {
      if (!isEmpty(searchText)) {
        setCategories(filtered)
      } else {
        setCategories(categories)
      }
    } else {
      setCategories(categories)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Product Category')).then(function (res) {
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
    setMode(layoutStore.mode)
  }, [store, sweetAlert, dispatch, layoutStore])

  const renderList = () => (
    <SimpleTable
      columns={columns}
      data={categories}
      theme={mode}
      loading={loading}
      onRowClick={handleCategorySelection}
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
      {store.category ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
