import { useEffect, useState, Fragment, useCallback, MouseEvent } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import categoriesActions from 'redux/categories/actions'
import { Category } from 'classes'
import { isEmpty } from 'utils'
import Spinner from 'components/Spinner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ReactSortable } from 'react-sortablejs'
import classnames from 'classnames'
import { MoreVertical, Edit2, Trash2, AlertTriangle } from 'react-feather'
import Avatar from 'core/components/avatar'
import moment from 'moment'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'
import Drawer from './Drawer'
import PaginationComponent from 'components/Pagination'

const {
  getCategoriesRequest,
  reorderList,
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
  const [pageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

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

  const handleCategorySelection = useCallback(
    (category: Category) => {
      dispatch(setCategory(category))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const handlePageClick = useCallback(
    (e: MouseEvent<HTMLElement>, index: number) => {
      e.preventDefault()
      setCurrentPage(index)
    },
    []
  )

  useEffect(() => {
    const { loading, categories, searchText, isDeleted, errors, filtered } =
      store
    setLoading(loading)
    if (categories.length) {
      setPageCount(Math.ceil(categories.length / pageSize))
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
  }, [store, sweetAlert, dispatch, pageSize])

  const renderLoader = () => <Spinner />

  const renderEmptyList = () => (
    <div className="no-results show">
      <h5>No entries found</h5>
    </div>
  )

  const renderAvatar = (category: Category) => {
    if (category) {
      return (
        <Avatar
          color="info"
          content={`${category.category.toUpperCase()}`}
          initials
        />
      )
    }
  }

  const renderList = () => (
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
      <Fragment>
        <ReactSortable
          tag="ul"
          list={categories}
          handle=".drag-icon"
          className="todo-task-list media-list"
          setList={(state: Category[]) => dispatch(reorderList(state))}
        >
          {categories
            .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
            .map((item) => (
              <li
                key={item.id}
                className={classnames('todo-item', { completed: false })}
              >
                <div className="todo-title-wrapper">
                  <div
                    className="todo-title-area"
                    onClick={() => handleCategorySelection(item)}
                  >
                    <MoreVertical className="drag-icon" />
                    {renderAvatar(item)}
                    <span className="todo-title">{`${item.category} (${item.products.length})`}</span>
                  </div>
                  <div className="todo-item-action mt-lg-0 mt-50">
                    <small className="text-nowrap text-muted mr-lg-1">
                      {moment(item.createdAt).format('MMM Do')}
                    </small>
                    <Link to={`/admin/product-categories/edit/${item.id}`}>
                      <Edit2
                        size={14}
                        className="mr-lg-1"
                        style={{ outline: 'none' }}
                        color="#40C4FF"
                      />
                    </Link>
                    <Trash2
                      size={14}
                      style={{ outline: 'none' }}
                      color="#F44336"
                      onClick={() => handleDelete(item.id, item.category)}
                    />
                  </div>
                </div>
              </li>
            ))}
        </ReactSortable>
      </Fragment>
    </PerfectScrollbar>
  )

  const renderPagination = () => (
    <PaginationComponent
      currentPage={currentPage}
      handlePageClick={handlePageClick}
      pageCount={pageCount}
    />
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        {loading ? (
          renderLoader()
        ) : categories.length ? (
          <Fragment>
            {renderList()}
            {renderPagination()}
          </Fragment>
        ) : (
          renderEmptyList()
        )}
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
