import React from 'react'
import Layout from '@core/layouts/VerticalLayout'

interface VerticalLayoutProps {
  navbar: any
  footer: any
  menu: any
  routerProps: any
  currentActiveItem: any
  layout: string
  setLayout: (layout: string) => void
  transition: 'fadeIn' | 'fadeInLeft' | 'zoomIn' | 'none'
  setTransition: (value: string) => void
}

const VerticalLayout: React.FC<VerticalLayoutProps> = (props) => (
  <Layout {...props}>{props.children}</Layout>
)

export default VerticalLayout
