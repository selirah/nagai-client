import React, { Fragment, useState, useRef } from 'react'
import Navigation from 'navigation/vertical'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavMenuHeader from './NavMenuHeader'
import NavMenuItems from './NavMenuItems'

interface SidebarProps {
  menuCollapsed: boolean
  routerProps: any
  menu: any
  currentActiveItem: any
  mode: 'light' | 'dark' | 'semi-dark'
  setMenuCollapsed: (value: boolean) => void
  setMenuVisibility: (value: boolean) => void
  menuVisibility: boolean
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { currentActiveItem, menu, menuCollapsed, mode, routerProps } = props
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [menuHover, setMenuHover] = useState(false)
  const shadowRef = useRef<any>(null)

  const onMouseEnter = () => {
    if (menuCollapsed) {
      setMenuHover(true)
    }
  }

  const scrollMenu = (container: any) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  return (
    <Fragment>
      <div
        className={classnames(
          'main-menu menu-fixed menu-accordion menu-shadow',
          {
            expanded: menuHover || menuCollapsed === false,
            'menu-light': mode !== 'semi-dark' && mode !== 'dark',
            'menu-dark': mode === 'semi-dark' || mode === 'dark'
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <NavMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="shadow-bottom" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
            >
              <NavMenuItems
                items={Navigation}
                groupActive={groupActive}
                setGroupActive={setGroupActive}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                groupOpen={groupOpen}
                setGroupOpen={setGroupOpen}
                routerProps={routerProps}
                menuCollapsed={menuCollapsed}
                menuHover={menuHover}
                currentActiveItem={currentActiveItem}
              />
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
