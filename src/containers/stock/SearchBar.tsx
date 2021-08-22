import React, { ChangeEvent, useCallback, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Search, MoreVertical, Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import stockActions from 'redux/stock/actions'

const { getStockRequest } = stockActions

interface Props {
  handleMainSidebar: () => void
}

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, stock, params } = Selector((state) => state.stock)

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    dispatch(getStockRequest(params))
  }, [dispatch, params, query])

  const handleExport = useCallback(
    (e: MouseEvent<HTMLElement>, value: 'excel' | 'pdf') => {
      e.preventDefault()
    },
    []
  )

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
                ? 'Search by product ID or sku ..'
                : ''
            }
            disabled={activeLink === 'add' || activeLink === 'edit'}
          />
        </InputGroup>
      </div>
      {activeLink === 'list' ? (
        <UncontrolledDropdown>
          <DropdownToggle
            className="hide-arrow mr-1"
            tag="a"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="text-body" size={16} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to="/"
              onClick={(e) => handleExport(e, 'excel')}
            >
              Excel
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to="/"
              onClick={(e) => handleExport(e, 'pdf')}
            >
              PDF
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </div>
  )
}

export default SearchBar
