import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userActions from '@redux/users/actions'
import { DBUser } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Edit3, Trash, AlertTriangle, Map } from 'react-feather'
import { deleteConfirmMessage, deleteDone } from '@utils/index'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from '@components/ToastBox'
import Drawer from './Drawer'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/DataTable'
import { userRoles } from '@utils/ability'
import { Badge } from 'reactstrap'

const {
  getUsersRequest,
  clearStates,
  setActiveLink,
  deleteUserRequest,
  setUser,
  setQueryParams
} = userActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.users)
  const layoutStore = Selector((state) => state.layout)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<DBUser[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [pageSize, setPageSize] = useState(store.params.page)
  const [currentPage, setCurrentPage] = useState(1)
  const [mode, setMode] = useState(layoutStore.mode)
  const [totalRows, setTotalRows] = useState(store.count)

  useEffect(() => {
    const { params } = store
    params.role = ''
    params.query = ''
    dispatch(setQueryParams(params))
    dispatch(getUsersRequest(params))
    dispatch(clearStates())
    dispatch(setActiveLink('list'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = useCallback(
    (id: number, name: string) => {
      sweetAlert.fire(deleteConfirmMessage(name)).then(function (res) {
        if (res.value) {
          dispatch(deleteUserRequest(id))
        }
      })
    },
    [dispatch, sweetAlert]
  )

  const renderBadge = useCallback((role: string) => {
    switch (role) {
      case userRoles.admin:
        return (
          <Badge className="text-uppercase" color="primary" pill>
            {role}
          </Badge>
        )
      case userRoles.agent:
        return (
          <Badge className="text-uppercase" color="secondary" pill>
            {role}
          </Badge>
        )
      case userRoles.dispatch:
        return (
          <Badge className="text-uppercase" color="info" pill>
            {role.toUpperCase()}
          </Badge>
        )
    }
  }, [])

  const renderVerified = useCallback((verified: boolean) => {
    switch (verified) {
      case true:
        return (
          <Badge className="text-uppercase" color="success" pill>
            Verified
          </Badge>
        )
      case false:
        return (
          <Badge className="text-uppercase" color="danger" pill>
            Not Verified
          </Badge>
        )
    }
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'First Name',
        sortable: true,
        selector: (row: DBUser) =>
          row.firstName ? row.firstName.toUpperCase() : null
      },
      {
        id: 2,
        name: 'Last Name',
        sortable: true,
        selector: (row: DBUser) =>
          row.lastName ? row.lastName.toUpperCase() : null
      },
      {
        id: 3,
        name: 'Email',
        sortable: true,
        selector: (row: DBUser) => row.email
      },
      {
        id: 4,
        name: 'Phone',
        sortable: true,
        selector: (row: DBUser) => row.phone
      },
      {
        id: 5,
        name: 'Role',
        sortable: true,
        selector: (row: DBUser) => renderBadge(row.role)
      },
      {
        id: 6,
        name: 'Verified',
        sortable: true,
        selector: (row: DBUser) => renderVerified(row.isVerified)
      },
      {
        cell: (row: DBUser) => (
          <Fragment>
            <Link to={`/admin/users/edit/${row.id}`}>
              <Edit3
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#40C4FF"
              />
            </Link>
            <Link to={`/admin/users/assign-territories/${row.id}`}>
              <Map
                size={14}
                className="mr-lg-1"
                style={{ outline: 'none' }}
                color="#7367f0"
              />
            </Link>
            <Trash
              size={14}
              style={{ outline: 'none' }}
              color="#F44336"
              className="cursor-pointer"
              onClick={() => handleDelete(row.id, row.firstName.toUpperCase())}
            />
          </Fragment>
        )
      }
    ],
    [handleDelete, renderBadge, renderVerified]
  )

  useEffect(() => {
    const { loading, users, isDeleted, errors, count } = store
    const { mode } = layoutStore
    setLoading(loading)
    if (users.length) {
      setUsers(users)
      setTotalRows(count)
    } else {
      setUsers(users)
    }
    if (isDeleted) {
      sweetAlert.fire(deleteDone('User')).then(function (res) {
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
      dispatch(getUsersRequest(params))
    },
    [dispatch, pageSize, store, currentPage]
  )

  const handlePerRowsChange = useCallback(
    async (newPerPage: number) => {
      const { params } = store
      params.page = newPerPage
      setPageSize(newPerPage)
      dispatch(getUsersRequest(params))
    },
    [dispatch, store]
  )

  const handleUserSelection = useCallback(
    (user: DBUser) => {
      dispatch(setUser(user))
      setToggleDrawer(!toggleDrawer)
    },
    [dispatch, toggleDrawer]
  )

  const renderList = () => (
    <Table
      columns={columns}
      currentPage={currentPage}
      data={users}
      handlePageClick={handlePageClick}
      handlePerRowsChange={handlePerRowsChange}
      loading={loading}
      onRowClicked={handleUserSelection}
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
      {store.user ? (
        <Drawer
          toggleDrawer={toggleDrawer}
          handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        />
      ) : null}
    </Fragment>
  )
}

export default List
