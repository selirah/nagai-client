import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent
} from 'react'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  ListGroup,
  ListGroupItem,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Spinner,
  UncontrolledTooltip
} from 'reactstrap'
import { List, Grid, Search, XCircle, Map } from 'react-feather'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import outletActions from 'redux/outlets/actions'
import { Territory } from 'classes'
import territoryActions from 'redux/terrirtories/actions'

interface Props {
  mainSidebar: boolean
}

const { setActiveLink, setQueryParams, getOutletsRequest } = outletActions
const {
  getSearchedTerritoriesRequest,
  setTerritory,
  clearSearchedTerritories
} = territoryActions

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  const store = Selector((state) => state.outlets)
  const territoryStore = Selector((state) => state.territories)
  const [active, setActive] = useState(store.activeLink)
  const dispatch: Dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [territories, setTerritories] = useState<Territory[]>([])
  const history = useHistory()
  const [search, setSearch] = useState(false)

  const handleActiveLink = useCallback(
    (value: string) => {
      if (value === 'list') {
        const { params } = store
        dispatch(setQueryParams(params))
        dispatch(getOutletsRequest(params))
      }
      dispatch(setActiveLink(value))
    },
    [dispatch, store]
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    if (query) {
      setSearch(true)
      dispatch(getSearchedTerritoriesRequest(query))
    }
  }, [query, dispatch])

  const onKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (query && e.key !== undefined && e.key === 'Enter') {
        setSearch(true)
        dispatch(getSearchedTerritoriesRequest(query))
      }
    },
    [query, dispatch]
  )

  const handleQueryFilter = useCallback(
    (e: MouseEvent<HTMLElement>, territory: Territory, activeLink: string) => {
      e.preventDefault()
      dispatch(setActiveLink(activeLink))
      dispatch(setTerritory(territory))
      history.push(`/admin/outlets/add/${territory.id}`)
    },
    [dispatch, history]
  )

  useEffect(() => {
    const { activeLink } = store
    const { searchedTerritories, loading } = territoryStore
    setLoading(loading)
    setActive(activeLink)
    setTerritories(searchedTerritories)
  }, [store, territoryStore])

  const renderSpinner = () => (
    <div className="m-auto text-center mt-5">
      <Spinner size={10} className="text-primary" />
    </div>
  )

  const renderEmptyResult = () => {
    return !search ? (
      <div className="no-results show px-2">
        <h5 className="text-primary small">Results would be shown here</h5>
      </div>
    ) : (
      <div className="no-results show px-2">
        <h5 className="text-danger small">No results found</h5>
      </div>
    )
  }

  const renderTerritoryList = () => {
    return (
      territories.length &&
      territories.map((t, i) => (
        <ListGroupItem
          active={active === `${t.id}`}
          className="d-flex align-items-center"
          tag={Link}
          to="#"
          onClick={(e) => handleQueryFilter(e, t, t.locality)}
          action
          key={i}
        >
          <span className="bullet bullet-sm bullet-success mr-1"></span>
          <span className="align-middle">{t.locality}</span>
        </ListGroupItem>
      ))
    )
  }

  const clearSearchedData = useCallback(() => {
    setSearch(false)
    setQuery('')
    dispatch(clearSearchedTerritories())
  }, [dispatch])

  return (
    <div
      className={classnames('sidebar-left', {
        show: mainSidebar === true
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content todo-sidebar">
          <div className="todo-app-menu">
            <div className="add-task"></div>
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/outlets'}
                  active={active === 'list'}
                  onClick={() => handleActiveLink('list')}
                >
                  <List className="mr-75" size={18} />
                  <span className="align-middle">Outlets List</span>
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag={Link}
                  to={'/admin/outlets/map'}
                  active={active === 'map'}
                  onClick={() => handleActiveLink('map')}
                >
                  <Map className="mr-75" size={18} />
                  <span className="align-middle">Map</span>
                </ListGroupItem>
              </ListGroup>
              <Fragment>
                <div className="mt-3 px-2 d-flex justify-content-between">
                  <h6 className="section-label mb-1">Search for Territory</h6>
                  <Grid size={14} />
                </div>
                <div className="px-2">
                  <InputGroup className="input-group-merge">
                    <Input
                      value={query}
                      onChange={handleChange}
                      placeholder="territory area"
                      onKeyPress={onKeyPress}
                    />
                    <InputGroupAddon
                      addonType="append"
                      className="cursor-pointer"
                      onClick={handleSearch}
                    >
                      <InputGroupText>
                        <Search className="text-muted" size={14} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <Fragment>
                  <div className="mt-3 px-2 d-flex justify-content-between">
                    <h6 className="section-label mb-1">Search Results</h6>
                    <XCircle
                      size={16}
                      className="cursor-pointer text-primary"
                      onClick={clearSearchedData}
                      id="clear"
                      style={{ outline: 'none' }}
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="clear"
                      style={{ outline: 'none' }}
                    >
                      Clear all
                    </UncontrolledTooltip>
                  </div>
                  <ListGroup className="list-group-labels">
                    {loading
                      ? renderSpinner()
                      : territories.length
                      ? renderTerritoryList()
                      : renderEmptyResult()}
                  </ListGroup>
                </Fragment>
              </Fragment>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
