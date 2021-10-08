import React from 'react'
import { X } from 'react-feather'
import RippleButton from 'core/components/ripple-button'
import { Modal, ModalBody } from 'reactstrap'
import { Selector } from 'redux/selector-dispatch'
import View from './view'

interface Props {
  toggleDrawer: boolean
  handleToggleDrawer: () => void
  onLoadMap: (map: any) => void
  mapRef: any
}

const ModalHeader: React.FC<{
  handleToggleDrawer: () => void
}> = (props) => {
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
  const { handleToggleDrawer, toggleDrawer, onLoadMap, mapRef } = props
  const { delivery } = Selector((state) => state.deliveries)

  return (
    <Modal
      isOpen={toggleDrawer}
      toggle={handleToggleDrawer}
      className="sidebar-xxl"
      contentClassName="p-0"
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <ModalHeader handleToggleDrawer={handleToggleDrawer}>
        <span className="ml-2">{delivery ? delivery.id : 'View'}</span>
      </ModalHeader>
      <ModalBody className="flex-grow-1 pb-sm-0 py-3">
        <View onLoadMap={onLoadMap} mapRef={mapRef} />
      </ModalBody>
    </Modal>
  )
}

export default Drawer
