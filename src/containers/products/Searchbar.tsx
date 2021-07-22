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

// const { setSearchText, setSortOrder } = manufacturerActions

interface Props {
  handleMainSidebar: () => void
}

const Searchbar = () => {
  return (
    <div>
      <h2>Searchbar</h2>
    </div>
  )
}

export default Searchbar
