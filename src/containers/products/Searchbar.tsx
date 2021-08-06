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
import productActions from 'redux/products/actions'

interface Props {
  handleMainSidebar: () => void
}

const { setSearchText, setSortOrder } = productActions

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, products } = Selector((state) => state.products)

  const handleFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      dispatch(setSearchText(e.target.value, products))
    },
    [dispatch, products]
  )

  const handleSort = useCallback(
    (e: MouseEvent<HTMLElement>, value: 'asc' | 'desc' | 'normal') => {
      e.preventDefault()
      dispatch(setSortOrder(value))
    },
    [dispatch]
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
                ? 'Search by name of product ..'
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
              onClick={(e) => handleSort(e, 'asc')}
            >
              Sort A-Z
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to="/"
              onClick={(e) => handleSort(e, 'desc')}
            >
              Sort Z-A
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to="/"
              onClick={(e) => handleSort(e, 'normal')}
            >
              Reset Sort
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : null}
    </div>
  )
}

export default SearchBar
