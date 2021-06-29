import React from 'react'
import { MoreHorizontal } from 'react-feather'

interface NavMenuSectionHeaderProps {
  item: any
  index: number
}

const NavMenuSectionHeader: React.FC<NavMenuSectionHeaderProps> = ({
  item,
  index
}) => {
  return (
    <li className="navigation-header" key={index}>
      <span>{item.header}</span>
      <MoreHorizontal className="feather-more-horizontal" />
    </li>
  )
}

export default NavMenuSectionHeader
