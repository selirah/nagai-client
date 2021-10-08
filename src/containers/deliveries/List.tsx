import {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useMemo,
  useRef
} from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import deliveryActions from 'redux/deliveries/actions'
import { Delivery, OrderStatus } from 'classes'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import moment from 'moment'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import { Edit3, Trash, AlertTriangle, Map } from 'react-feather'
import Table from 'components/DataTable'
import { deleteConfirmMessage, deleteDone } from 'utils'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Badge } from 'reactstrap'
import ExpandedRow from './ExpandedRow'
import { userRoles } from 'utils/ability'
import { toast, Slide } from 'react-toastify'
import ToastBox from 'components/ToastBox'

const {
  getDeliveriesRequest,
  clearStates,
  setActiveLink,
  setQueryParams,
  setDelivery,
  deleteDeliveryRequest
} = deliveryActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.deliveries)
  const layoutStore = Selector((state) => state.layout)
  const authStore = Selector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)
  const [currentPage, setCurrentPage] = useState(1)
  const sweetAlert = withReactContent(SWAL)
  const mapRef = useRef<any>()

  useEffect(() => {
    const { params } = store
    params.skip = 0
    params.query = ''
    params.fromDate = ''
    params.toDate = ''
    dispatch(setQueryParams(params))
    dispatch(getDeliveriesRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: string, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteDeliveryRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const renderBadge = useCallback((delivered: boolean) => {
    switch (delivered) {
      case true:
        return (
          <Badge className="text-uppercase" color="success" pill>
            YES
          </Badge>
        )
      case false:
        return (
          <Badge className="text-uppercase" color="warning" pill>
            NO
          </Badge>
        )
    }
  }, [])

  const handleDeliverySelection = useCallback(
    (delivery: Delivery) => {
      dispatch(setDelivery(delivery))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'ID',
        sortable: true,
        selector: (row: Delivery) => row.id
      },
      {
        id: 2,
        name: 'Order Number',
        sortable: true,
        selector: (row: Delivery) => row.orderId
      },
      {
        id: 3,
        name: 'Delivered',
        sortable: true,
        selector: (row: Delivery) => renderBadge(row.isDelivered)
      },
      {
        id: 4,
        name: 'Date',
        sortable: true,
        selector: (row: Delivery) =>
          moment(row.createdAt).format("MMM Do, 'YY, h:mm a")
      },
      {
        cell: (row: Delivery) => (
          <Fragment>
            {authStore.user!.role === userRoles.admin ||
            authStore.user!.role === userRoles.agent ? (
              <Fragment>
                <Link to={`/admin/deliveries/edit/${row.id}`}>
                  <Edit3
                    size={14}
                    className="mr-lg-1"
                    style={{ outline: 'none' }}
                    color="#40C4FF"
                  />
                </Link>
                {row.order.status === OrderStatus.DISPATCH ||
                row.order.status === OrderStatus.TRANSIT ? (
                  <Map
                    size={14}
                    className="mr-lg-1"
                    style={{ outline: 'none' }}
                    color="#7367f0"
                    onClick={() => handleDeliverySelection(row)}
                  />
                ) : null}
                <Trash
                  size={14}
                  style={{ outline: 'none' }}
                  color="#F44336"
                  className="cursor-pointer"
                  onClick={() => handleDelete(row.id, row.orderId)}
                />
              </Fragment>
            ) : (
              <Link to={`/admin/deliveries/update/${row.id}`}>
                <Edit3
                  size={14}
                  className="mr-lg-1"
                  style={{ outline: 'none' }}
                  color="#40C4FF"
                />
              </Link>
            )}
          </Fragment>
        )
      }
    ],
    [handleDelete, renderBadge, authStore, handleDeliverySelection]
  )

  useEffect(() => {
    const { loading, deliveries, count, isDeleted, errors } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (deliveries.length) {
      setDeliveries(deliveries)
      setTotalRows(count)
    } else {
      setDeliveries(deliveries)
    }
    setMode(mode)
    if (isDeleted) {
      sweetAlert.fire(deleteDone('Delivery')).then(function (res) {
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
  }, [store, pageSize, layoutStore, sweetAlert, dispatch])

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
      dispatch(getDeliveriesRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getDeliveriesRequest(params))
    },
    [dispatch, store]
  )

  const onLoadMap = useCallback((map) => {
    mapRef.current = map
  }, [])

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={deliveries}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleDeliverySelection}
      pageSize={pageSize}
      server
      theme={mode}
      totalRows={totalRows}
      expandableRows
      expandableRowsComponent={
        <ExpandedRow handleDeliverySelection={handleDeliverySelection} />
      }
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
      {store.delivery ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
          onLoadMap={onLoadMap}
          mapRef={mapRef}
        />
      ) : null}
    </Fragment>
  )
}

export default List
