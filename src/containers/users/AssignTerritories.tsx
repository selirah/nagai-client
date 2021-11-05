import { useEffect, useState, Fragment, useCallback, useMemo } from 'react'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userActions from '@redux/users/actions'
import utilsActions from '@redux/utils/actions'
import { Territory, UserTerritoryFields } from '@classes/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SWAL from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, Slide } from 'react-toastify'
import ToastBox from '@components/ToastBox'
import { IDataTableColumn } from 'react-data-table-component'
import Table from '@components/SimpleTable'
import { isEmpty } from '@utils/index'
import moment from 'moment'
import RippleButton from '@core/components/ripple-button'
import { Collapse, Spinner, Row, Col, Alert } from 'reactstrap'
import { Coffee } from 'react-feather'

const { getTerritoriesRequest } = utilsActions
const {
  assignUserTerritoryRequest,
  updateUserTerritoryRequest,
  clearStates,
  setActiveLink
} = userActions

type QueryParam = {
  id: string
}

const AssignTerritories = () => {
  const dispatch: Dispatch = useDispatch()
  const { id } = useParams<QueryParam>()
  const store = Selector((state) => state.users)
  const utilsStore = Selector((state) => state.utils)
  const layoutStore = Selector((state) => state.layout)
  const [territories, setTerritories] = useState<Territory[]>([])
  const sweetAlert = withReactContent(SWAL)
  const [mode, setMode] = useState(layoutStore.mode)
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState<Territory[]>([])
  const [btnLoading, setBtnLoading] = useState(false)
  const [err, setErr] = useState(null)
  const history = useHistory()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    dispatch(getTerritoriesRequest())
    dispatch(clearStates())
    dispatch(setActiveLink('assign-territories'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Locality',
        sortable: true,
        selector: (row: Territory) => row.locality.toUpperCase()
      },
      {
        id: 2,
        name: 'Region',
        sortable: true,
        selector: (row: Territory) => row.region.region
      },
      {
        id: 3,
        name: 'Created Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 4,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.updatedAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  useEffect(() => {
    const { loading, territories, searchText, filtered } = utilsStore
    const { isSubmitting, errors, isSucceeded } = store
    const { mode } = layoutStore
    setLoading(loading)
    setBtnLoading(isSubmitting)
    setErr(errors)
    setMode(mode)
    if (territories.length) {
      if (!isEmpty(searchText)) {
        setTerritories(filtered)
      } else {
        setTerritories(territories)
      }
    } else {
      setTerritories(territories)
    }
    if (isSucceeded) {
      toast.success(
        <ToastBox
          color="success"
          icon={<Coffee />}
          message="Territory assigned to user successfully"
          title="Nice!"
        />,
        {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 5000,
          position: 'bottom-right'
        }
      )
      history.push('/admin/users')
    }
  }, [utilsStore, sweetAlert, dispatch, layoutStore, store, history])

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows)
    if (state.selectedRows.length) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [])

  const rowSelectCritera = useCallback(
    (row: Territory) => {
      let isPresent: boolean = false
      const user = store.users.find((u) => u.id === parseInt(id))
      if (user !== undefined) {
        if (user.userTerritories) {
          user.userTerritories.territories.map((t: any) => {
            if (t.id === row.id) {
              return t.id === row.id ? (isPresent = true) : false
            } else {
              return null
            }
          })
        }
      }
      return isPresent
    },
    [store, id]
  )

  const renderList = () => (
    <Table
      columns={columns}
      data={territories}
      loading={loading}
      theme={mode}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      selectableRowSelected={rowSelectCritera}
    />
  )

  const onAssignTerritory = useCallback(() => {
    const user = store.users.find((u) => u.id === parseInt(id))
    if (user !== undefined) {
      if (user.userTerritories) {
        // update
        const payload: UserTerritoryFields = {
          territories: selectedRows,
          userId: user.id,
          id: user.userTerritories.id
        }
        dispatch(updateUserTerritoryRequest(payload))
      } else {
        // add
        const payload: UserTerritoryFields = {
          territories: selectedRows,
          userId: user.id
        }
        dispatch(assignUserTerritoryRequest(payload))
      }
    }
  }, [selectedRows, store, id, dispatch])

  const renderError = (errors: any) => (
    <Row className="px-3">
      <Col sm="12" md="12" lg="12">
        <Alert color="danger" className="p-2">
          <small className="font-weight-bolder">
            {errors.errors[0].message}
          </small>
        </Alert>
      </Col>
    </Row>
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
          {showButton ? (
            <div className="m-1">
              <RippleButton
                type="button"
                color="primary"
                size="sm"
                onClick={onAssignTerritory}
              >
                <Collapse isOpen={btnLoading}>
                  <Spinner color="white" className="mr-2" size="sm" /> Saving .
                  . .
                </Collapse>
                <Collapse isOpen={!btnLoading}>Assign Territory</Collapse>
              </RippleButton>
            </div>
          ) : null}
          {err ? renderError(err) : null}
          {renderList()}
        </PerfectScrollbar>
      </div>
    </Fragment>
  )
}

export default AssignTerritories
