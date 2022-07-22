import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import outletActions from '@redux/outlets/actions'
import { Outlet } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, Trash, AlertTriangle } from 'react-feather'
import { deleteConfirmMessage, deleteDone } from '@utils/index'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from '@components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'

const {
  getOutletsRequest,
  clearStates,
  setActiveLink,
  deleteOutletRequest,
  setOutlet,
  setQueryParams
} = outletActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.outlets)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.territory = 0
    dispatch(setQueryParams(params))
    dispatch(getOutletsRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: number, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteOutletRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Barcode',
        sortable: true,
        selector: (row: Outlet) => row.barcode
      },
      {
        id: 2,
        name: 'Owner Name',
        sortable: true,
        selector: (row: Outlet) => row.ownerName.toUpperCase()
      },
      {
        id: 3,
        name: 'Outlet',
        sortable: true,
        selector: (row: Outlet) => row.outletName.toUpperCase()
      },
      {
        id: 4,
        name: 'Mobile',
        sortable: true,
        selector: (row: Outlet) => row.mobile
      },
      {
        id: 5,
        name: 'Territory',
        sortable: true,
        selector: (row: Outlet) => row.territory.locality.toUpperCase()
      },
      {
        id: 6,
        name: 'Locality',
        sortable: true,
        selector: (row: Outlet) => row.locality.toUpperCase()
      },
      {
        id: 7,
        name: 'Sub-locality',
        sortable: true,
        selector: (row: Outlet) => row.subLocality.toUpperCase()
      },
      {
        cell: (row: Outlet) => (
          <Fragment>
            <Link to={`/admin/outlets/edit/${row.id}`}>
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
              onClick={() => handleDelete(row.id, row.outletName)}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete]
  )

  useEffect(() => {
    const { loading, outlets, isDeleted, errors, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (outlets.length) {
      setOutlets(outlets)
      setTotalRows(count)
    } else {
      setOutlets(outlets)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Outlet')).then(function (res) {
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
      dispatch(getOutletsRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getOutletsRequest(params))
    },
    [dispatch, store]
  )

  const handleOutletSelection = useCallback(
    (stock: Outlet) => {
      dispatch(setOutlet(stock))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={outlets}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleOutletSelection}
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
      {store.outlet ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
