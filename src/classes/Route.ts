import React from 'react'

type meta = {
  authRoute?: boolean
  action?: any
  resource?: any
  publicRoute?: any
}

export type Route = {
  path: string
  component: React.LazyExoticComponent<any>
  exact?: boolean
  layout?: string
  meta?: meta
  appLayout?: boolean
  className?: string
}
