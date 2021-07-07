import React, { Fragment } from 'react'
import Avatar from 'core/components/avatar'

interface ToastBoxProps {
  color: 'success' | 'warning' | 'danger' | 'info' | 'dark' | 'primary'
  icon: React.ReactNode
  title: string
  message: string
}

const ToastBox: React.FC<ToastBoxProps> = (props) => {
  const { color, icon, title, message } = props
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color={color} icon={icon} />
          <h6 className="toast-title font-weight-bold">{title}</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>{message}</span>
      </div>
    </Fragment>
  )
}

export default ToastBox
