import React from 'react'
import { X } from 'react-feather'
import RippleButton from 'core/components/ripple-button'
import { Modal, ModalBody } from 'reactstrap'
import { Selector } from 'redux/selector-dispatch'
import View from './view'

interface Props {
  toggleDrawer: boolean
  handleToggleDrawer: () => void
}

const ModalHeader: React.FC<{ handleToggleDrawer: () => void }> = (props) => {
  const { handleToggleDrawer, children } = props
  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
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
  const { manufacturer } = Selector((state) => state.manufacturers)

  return (
    <Modal
      isOpen={toggleDrawer}
      toggle={handleToggleDrawer}
      className="sidebar-xxl"
      contentClassName="p-0"
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <ModalHeader handleToggleDrawer={handleToggleDrawer}>
        <span className="ml-2">
          {manufacturer ? manufacturer.name : 'View'}
        </span>
      </ModalHeader>
      <ModalBody className="flex-grow-1 pb-sm-0 pb-3 px-0">
        <View />
      </ModalBody>
    </Modal>
  )
}

export default Drawer