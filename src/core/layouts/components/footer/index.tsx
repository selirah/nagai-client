import React from 'react'

interface FooterProps {
  footerType: any
  footerClasses: any
}

const Footer: React.FC<FooterProps> = (props) => {
  const { footerClasses, footerType } = props

  return (
    <p className="clearfix mb-0">
      <span className="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href="https://pces.mk" target="_blank" rel="noopener noreferrer">
          EDWARDSELIRAH.COM
        </a>
        <span className="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
      <span className="float-md-right d-none d-md-block">Version 1.0.0</span>
    </p>
  )
}

export default Footer
