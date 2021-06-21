import React from 'react'

export type NavLinks = {
  id: string
  title: string
  icon: React.ReactNode
  navLink: string
}

export type Navigation = {
  links: NavLinks
  header?: string
}
