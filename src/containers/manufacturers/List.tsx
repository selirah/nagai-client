import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import manufacturerActions from 'redux/manufacturers/actions'
import { Manufacturer } from 'classes'
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
  getManufacturersRequest,
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
  const layoutStore = Selector((state) => state.layout)
  const [mode, setMode] = useState(layoutStore.mode)

  useEffect(() => {
    if (isEmpty(manufacturers)) {
      dispatch(getManufacturersRequest())
    }
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Name',
        sortable: true,
        selector: (row: Manufacturer) => row.name
      },
      {
        id: 2,
        name: 'Number of Products',
        sortable: true,
        selector: (row: Manufacturer) => row.products.length
      },
      {
        id: 3,
        name: 'Location',
        sortable: true,
        selector: (row: Manufacturer) => row.location
      },
      {
        id: 4,
        name: 'Date Created',
        sortable: true,
        selector: (row: Manufacturer) =>
          moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 5,
        name: 'Date Updated',
        sortable: true,
        selector: (row: Manufacturer) =>
          moment(row.updatedAt).format("MMM Do, 'YY")
      },

      {
        cell: (row: Manufacturer) => (
          <Fragment>
            <Link to={`/admin/manufacturers/edit/${row.id}`}>
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
              onClick={() => handleDelete(row.id, row.name)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  const handleManufacturerSelection = useCallback(
    (manufacturer: Manufacturer) => {
      dispatch(setManufacturer(manufacturer))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  useEffect(() => {
    const { loading, manufacturers, isDeleted, errors, searchText, filtered } =
      store
    setLoading(loading)
    if (manufacturers.length) {
      if (!isEmpty(searchText)) {
        setManufacturers(filtered)
      } else {
        setManufacturers(manufacturers)
      }
    } else {
      setManufacturers(manufacturers)
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
    setMode(layoutStore.mode)
  }, [store, sweetAlert, dispatch, layoutStore])

  const renderList = () => (
    <SimpleTable
      columns={columns}
      data={manufacturers}
      theme={mode}
      loading={loading}
      onRowClick={handleManufacturerSelection}
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
      {store.manufacturer ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
