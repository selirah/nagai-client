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
  DropdownItem,
  Button
} from 'reactstrap'
import { Search, MoreVertical, Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'

interface Props {
  handleMainSidebar: () => void
}

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  return <div></div>
}

export default SearchBar
