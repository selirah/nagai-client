import { useEffect, useState, Fragment, useCallback } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import manufacturerActions from 'redux/manufacturers/actions'
import { Manufacturer } from 'classes'
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

const {
  getManufacturersRequest,
  reorderList,
  clearStates,
  setActiveLink,
  deleteManufacturerRequest,
  setManufacturer
} = manufacturerActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.manufacturers)
  const [loading, setLoading] = useState(false)
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)

  useEffect(() => {
    if (isEmpty(manufacturers)) {
      dispatch(getManufacturersRequest())
    }
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = useCallback(
    (items: Manufacturer[], searchText: string) => {
      const res = items.filter((item) => {
        const blob = `${item.name.toLowerCase()}`
        return blob.indexOf(searchText.replace(/ /gi, '').toLowerCase()) > -1
      })
      return res
    },
    []
  )

  const handleDelete = useCallback(
    (id: number, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteManufacturerRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const handleManufacturerSelection = useCallback(
    (manufacturer: Manufacturer) => {
      dispatch(setManufacturer(manufacturer))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  useEffect(() => {
    const { loading, manufacturers, searchText, isDeleted, errors } = store
    setLoading(loading)
    if (manufacturers.length) {
      if (!isEmpty(searchText)) {
        const res = handleFilter(manufacturers, searchText)
        setManufacturers(res)
      } else {
        setManufacturers(manufacturers)
      }
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Manufacturer')).then(function (res) {
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
  }, [store, handleFilter, sweetAlert, dispatch])

  const renderLoader = () => <Spinner />

  const renderEmptyList = () => (
    <div className="no-results show">
      <h5>No entries found</h5>
    </div>
  )

  const renderAvatar = (manifacturer: Manufacturer) => {
    if (manifacturer && manifacturer.logo) {
      return (
        <div
          className="avatar-placeholder"
          style={{
            background: `url(${manifacturer.logo}) no-repeat center transparent`
          }}
        ></div>
      )
    } else {
      return (
        <Avatar color="primary" content={`${manifacturer.name}`} initials />
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
          list={manufacturers}
          handle=".drag-icon"
          className="todo-task-list media-list"
          setList={(state: Manufacturer[]) => dispatch(reorderList(state))}
        >
          {manufacturers.map((item) => (
            <li
              key={item.id}
              className={classnames('todo-item', { completed: false })}
            >
              <div className="todo-title-wrapper">
                <div
                  className="todo-title-area"
                  onClick={() => handleManufacturerSelection(item)}
                >
                  <MoreVertical className="drag-icon" />
                  {renderAvatar(item)}
                  <span className="todo-title">{`${item.name}`}</span>
                </div>
                <div className="todo-item-action mt-lg-0 mt-50">
                  <small className="text-nowrap text-muted mr-lg-1">
                    {moment(item.createdAt).format('MMM Do')}
                  </small>
                  <Link to={`/admin/manufacturers/edit/${item.id}`}>
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
                    onClick={() => handleDelete(item.id, item.name)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ReactSortable>
      </Fragment>
    </PerfectScrollbar>
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        {loading
          ? renderLoader()
          : manufacturers.length
          ? renderList()
          : renderEmptyList()}
      </div>
      <Drawer
        toggleDrawer={toggleDrawer}
        handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
      />
    </Fragment>
  )
}

export default List
