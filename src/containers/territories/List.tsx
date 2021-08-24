import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import territoryActions from 'redux/terrirtories/actions'
import { Territory } from 'classes'
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
import Table from 'components/DataTable'

const {
  getTerritoryRequest,
  clearStates,
  setActiveLink,
  deleteTerritoryRequest,
  setTerritory,
  setQueryParams
} = territoryActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.territories)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [territories, setTerritories] = useState<Territory[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)

  useEffect(() => {
    const { params } = store
    params.region = 0
    params.query = ''
    dispatch(setQueryParams(params))
    dispatch(getTerritoryRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: number, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteTerritoryRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Locality',
        sortable: true,
        selector: (row: Territory) => row.locality
      },
      {
        id: 2,
        name: 'Region',
        sortable: true,
        selector: (row: Territory) => row.region.region
      },
      {
        id: 3,
        name: 'Latitude',
        sortable: true,
        selector: (row: Territory) => row.coordinates.lat
      },
      {
        id: 4,
        name: 'Longitude',
        sortable: true,
        selector: (row: Territory) => row.coordinates.lng
      },
      {
        id: 8,
        name: 'Created Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 9,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.updatedAt).format("MMM Do, 'YY")
      },
      {
        cell: (row: Territory) => (
          <Fragment>
            <Link to={`/admin/territories/edit/${row.id}`}>
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
              onClick={() => handleDelete(row.id, row.locality)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  useEffect(() => {
    const { loading, territories, isDeleted, errors, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (territories.length) {
      setTerritories(territories)
      setTotalRows(count)
    } else {
      setTerritories(territories)
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
      dispatch(getTerritoryRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getTerritoryRequest(params))
    },
    [dispatch, store]
  )

  const handleTerritorySelection = useCallback(
    (product: Territory) => {
      dispatch(setTerritory(product))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={territories}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleTerritorySelection}
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
      {/* {store.territory ? (
    <Drawer
      toggleDrawer={toggleDrawer}
      handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
    />
  ) : null} */}
    </Fragment>
  )
}

export default List
