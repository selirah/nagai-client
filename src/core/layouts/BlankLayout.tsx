import React, { useState, useEffect } from 'react'
// import { useLayoutMode } from 'hooks'

const BlankLayout: React.FC = ({ children, ...rest }) => {
  // const [mode, setMode] = useLayoutMode()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="blank-page">
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default BlankLayout
