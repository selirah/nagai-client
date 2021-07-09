import React, { useState, useCallback } from 'react'
import navigation from 'navigation/horizontal'
import NavMenuItems from './NavMenuItems'

interface HorizontalMenuProps {
  currentActiveItem: any
  routerProps: any
}

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({
  currentActiveItem,
  routerProps
}) => {
  const [activeItem, setActiveItem] = useState(null)
  const [groupActive, setGroupActive] = useState<any>([])
  const [openDropdown, setOpenDropdown] = useState<any>([])

  const onMouseEnter = useCallback(
    (id: any) => {
      const arr = openDropdown
      arr.splice(arr.indexOf(id), 1)
      setOpenDropdown([...arr])
    },
    [openDropdown]
  )

  const onMouseLeave = useCallback(
    (id: any) => {
      const arr = openDropdown
      arr.splice(arr.indexOf(id), 1)
      setOpenDropdown([...arr])
    },
    [openDropdown]
  )

  return (
    <div className="navbar-container main-menu-content">
      <ul className="nav navbar-nav" id="main-menu-navigation">
        <NavMenuItems
          submenu={false}
          items={navigation}
          activeItem={activeItem}
          groupActive={groupActive}
          routerProps={routerProps}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          openDropdown={openDropdown}
          setActiveItem={setActiveItem}
          setGroupActive={setGroupActive}
          setOpenDropdown={setOpenDropdown}
          currentActiveItem={currentActiveItem}
        />
      </ul>
    </div>
  )
}

export default HorizontalMenu
