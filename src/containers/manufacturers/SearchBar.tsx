import React, { ChangeEvent } from 'react'
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

interface Props {
  query: string
  handleFilter: (e: ChangeEvent<HTMLInputElement>) => void
  handleSort: (value: string) => void
  handleMainSidebar: () => void
}

const SearchBar: React.FC<Props> = (props) => {
  const { query, handleFilter, handleMainSidebar, handleSort } = props

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
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroupAddon>
          <Input value={query} onChange={handleFilter} />
        </InputGroup>
      </div>
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
            onClick={(e) => handleSort('title-asc')}
          >
            Sort AZ
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to="/"
            onClick={(e) => handleSort('title-desc')}
          >
            Sort ZA
          </DropdownItem>
          <DropdownItem tag={Link} to="/" onClick={(e) => handleSort('')}>
            Reset Sort
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export default SearchBar
