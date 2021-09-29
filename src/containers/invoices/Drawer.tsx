import React from 'react'
import { X, Edit3 } from 'react-feather'
import RippleButton from 'core/components/ripple-button'
import { Modal, ModalBody } from 'reactstrap'
import { Selector } from 'redux/selector-dispatch'
import View from './view'
import { Link } from 'react-router-dom'

interface Props {
  toggleDrawer: boolean
  handleToggleDrawer: () => void
}

const ModalHeader: React.FC<{
  handleToggleDrawer: () => void
  id: number | string
}> = (props) => {
  const { handleToggleDrawer, children, id } = props

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <RippleButton color="info" tag={Link} to={`/admin/orders/edit/${id}`}>
          Edit <Edit3 className="font-weight-normal ml-2" size={12} />
        </RippleButton>
        <span className="todo-item-favorite cursor-pointer mx-75"></span>
        <RippleButton color="danger" onClick={handleToggleDrawer}>
          Close <X className="font-weight-normal ml-2" size={12} />
        </RippleButton>
      </div>
    </div>
  )
}

const Drawer: React.FC<Props> = (props) => {
  const { handleToggleDrawer, toggleDrawer } = props
  return <div></div>
}

export default Drawer