import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { X } from 'react-feather'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

interface SidebarProps {
  title: string
  open: boolean
  toggleSidebar: () => void
  size?: 'sm' | 'lg'
  className?: any
  headerClassName?: any
  bodyClassName?: any
  contentClassName?: any
  wrapperClassName?: any
  children: any
  width?: number | string
  closeBtn: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    width,
    open,
    toggleSidebar,
    size,
    bodyClassName,
    contentClassName,
    wrapperClassName,
    headerClassName,
    className,
    title,
    children,
    closeBtn,
    ...rest
  } = props

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = closeBtn ? (
    closeBtn
  ) : (
    <X className="cursor-pointer" size={15} onClick={toggleSidebar} />
  )

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName={classnames({
        [contentClassName]: contentClassName
      })}
      modalClassName={classnames('modal-slide-in', {
        [wrapperClassName ? wrapperClassName : '']: wrapperClassName
      })}
      className={classnames({
        [className]: className,
        'sidebar-lg': size === 'lg',
        'sidebar-sm': size === 'sm'
      })}
      {...(width !== undefined
        ? { style: { width: String(width) + 'px' } }
        : null)}
      {...rest}
    >
      <ModalHeader
        className={classnames({
          [headerClassName]: headerClassName
        })}
        toggle={toggleSidebar}
        close={renderCloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          <span className="align-middle">{title}</span>
        </h5>
      </ModalHeader>
      <ModalBody
        className={classnames('flex-grow-1', {
          [bodyClassName]: bodyClassName
        })}
      >
        {children}
      </ModalBody>
    </Modal>
  )
}

export default Sidebar
