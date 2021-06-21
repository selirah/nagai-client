import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'

interface RippleButtonProps {
  className?: any
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const RippleButton: React.FC<RippleButtonProps> = (props) => {
  const { className, onclick, children, ...rest } = props
  const [mounted, setMounted] = useState(false)
  const [isRippling, setIsRippling] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })

  // ** Toggle mounted on mounr and unmount
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // ** Check for coods and set ripple
  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true)
        setTimeout(() => setIsRippling(false), 500)
      } else {
        setIsRippling(false)
      }
    }
  }, [coords])

  // ** ResetCoords on ripple end
  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 })
    }
  }, [isRippling])

  return (
    <Button
      className={classnames('waves-effect', {
        [className]: className
      })}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.target as HTMLFormElement
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        if (onclick) {
          onclick(e)
        }
      }}
      {...rest}
    >
      {children}
      {isRippling ? (
        <span
          className="waves-ripple"
          style={{ left: coords.x, top: coords.y }}
        ></span>
      ) : null}
    </Button>
  )
}

export default RippleButton
