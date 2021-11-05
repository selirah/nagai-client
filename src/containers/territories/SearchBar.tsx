import React, { ChangeEvent, useCallback, useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from 'reactstrap'
import { Search, Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import territoryActions from '@redux/terrirtories/actions'

interface Props {
  handleMainSidebar: () => void
}

const { getTerritoryRequest } = territoryActions

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, params } = Selector((state) => state.territories)

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    dispatch(getTerritoryRequest(params))
  }, [dispatch, params, query])

  return (
    <div className="app-fixed-search d-flex align-items-center">
      <div
        className="sidebar-toggle cursor-pointer d-block d-lg-none ml-1"
        onClick={handleMainSidebar}
      >
        <Menu size={21} />
      </div>
      <div className="d-flex align-content-center justify-content-between w-100">
        <InputGroup className="input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              {activeLink !== 'add' && activeLink !== 'edit' ? (
                <Search className="text-muted" size={14} />
              ) : null}
            </InputGroupText>
          </InputGroupAddon>
          <Input
            value={query}
            onChange={handleFilter}
            placeholder={
              activeLink !== 'add' && activeLink !== 'edit'
                ? 'Search by locality ..'
                : ''
            }
            disabled={activeLink === 'add' || activeLink === 'edit'}
          />
        </InputGroup>
        <Button
          color="primary"
          className="ml-1"
          onClick={handleSearch}
          disabled={activeLink === 'add' || activeLink === 'edit'}
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
