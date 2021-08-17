import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  MouseEvent
} from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { PlusCircle, List, Grid } from 'react-feather'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'

interface Props {
  mainSidebar: boolean
}

const Sidebar: React.FC<Props> = (props) => {
  const { mainSidebar } = props
  return <div></div>
}

export default Sidebar
