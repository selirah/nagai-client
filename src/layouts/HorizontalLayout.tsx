import React from 'react'
import Layout from 'core/layouts/HorizontalLayout'

interface HorizontalLayoutProps {
  navbar: any
  footer: any
  menu: any
  currentActiveItem: any
  routerProps: any
  layout: any
  setLayout: any
  transition: any
  setTransition: (value: string) => void
  setMenuVisibility: (value: boolean) => void
}

const HorizontalLayout: React.FC<HorizontalLayoutProps> = (props) => (
  <Layout {...props}>{props.children}</Layout>
)
export default HorizontalLayout
