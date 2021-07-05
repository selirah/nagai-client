import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import layoutActions from 'redux/layout/actions'
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, Button } from 'reactstrap'
import themeConfig from 'theme/themeConfig'
import Customizer from 'core/components/customizer'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'
import SidebarComponent from './components/menu/vertical-menu'
import {
  useRTL,
  useLayoutMode,
  useNavbarType,
  useFooterType,
  useNavbarColor
} from 'hooks'
import 'core/scss/base/core/menu/menu-types/vertical-menu.scss'
import 'core/scss/base/core/menu/menu-types/vertical-overlay-menu.scss'
const { handleMenuCollapsed, handleContentWidth, handleMenuHidden } =
  layoutActions

const footerClasses: any = {
  static: 'footer-static',
  sticky: 'footer-fixed',
  hidden: 'footer-hidden'
}

const navbarWrapperClasses: any = {
  floating: 'navbar-floating',
  sticky: 'navbar-sticky',
  static: 'navbar-static',
  hidden: 'navbar-hidden'
}

const navbarClasses: any = {
  floating: 'floating-nav',
  sticky: 'fixed-top',
  static: 'navbar-static-top',
  hidden: 'd-none'
}

interface VerticalLayoutProps {
  navbar: any
  footer: any
  menu: any
  routerProps: any
  currentActiveItem: any
  layout: 'HorizontalLayout' | 'VerticalLayout'
  setLayout: (layout: string) => void
  transition: 'fadeIn' | 'fadeInLeft' | 'zoomIn' | 'none'
  setTransition: (value: string) => void
}

const VerticalLayout: React.FC<VerticalLayoutProps> = (props) => {
  const {
    currentActiveItem,
    footer,
    menu,
    navbar,
    routerProps,
    layout,
    setLayout,
    transition,
    setTransition,
    children
  } = props
  const [mode, setMode] = useLayoutMode()
  const [isRTL, setIsRTL] = useRTL()
  const [navbarType, setNavbarType] = useNavbarType()
  const [footerType, setFooterType] = useFooterType()
  const [navbarColor, setNavbarColor] = useNavbarColor()
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const dispatch: Dispatch = useDispatch()
  const layoutStore = Selector((state) => state.layout)
  const location = useLocation()
  const { contentWidth, menuCollapsed, menuHidden } = layoutStore

  const handleWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const setMenuCollapsed = useCallback(
    (value: boolean) => {
      dispatch(handleMenuCollapsed(value))
    },
    [dispatch]
  )

  const setContentWidth = useCallback(
    (value: string) => {
      dispatch(handleContentWidth(value))
    },
    [dispatch]
  )

  const setIsHidden = useCallback(
    (value: boolean) => {
      dispatch(handleMenuHidden(value))
    },
    [dispatch]
  )

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location, menuVisibility, setMenuVisibility, windowWidth])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth, handleWindowWidth])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const bgColorCondition =
    navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'}`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(menuHidden ? { 'data-col': '1-column' } : null)}
    >
      {!menuHidden ? (
        <SidebarComponent
          mode={mode}
          menu={menu}
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          menuVisibility={menuVisibility}
          setMenuVisibility={setMenuVisibility}
          routerProps={routerProps}
          currentActiveItem={currentActiveItem}
        />
      ) : null}
      <Navbar
        expand="lg"
        light={mode !== 'dark'}
        dark={mode === 'dark' || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || 'floating-nav'
          } navbar-shadow`
        )}
      >
        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar
          ) : (
            <NavbarComponent
              setMenuVisibility={setMenuVisibility}
              mode={mode}
              setMode={setMode}
            />
          )}
        </div>
      </Navbar>
      {children}
      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      {themeConfig.layout.customizer === true ? (
        <Customizer
          layoutMode={mode}
          setLayoutMode={setMode}
          footerType={footerType}
          setFooterType={setFooterType}
          navbarType={navbarType}
          setNavbarType={setNavbarType}
          navbarColor={navbarColor}
          setNavbarColor={setNavbarColor}
          isRtl={isRTL}
          setIsRtl={setIsRTL}
          layout={layout}
          setLayout={setLayout}
          isHidden={menuHidden}
          setIsHidden={setIsHidden}
          contentWidth={contentWidth}
          setContentWidth={setContentWidth}
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          transition={transition}
          setTransition={setTransition}
          themeConfig={themeConfig}
        />
      ) : null}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || 'footer-static'}`,
          {
            'd-none': footerType === 'hidden'
          }
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>
      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  )
}

export default VerticalLayout
