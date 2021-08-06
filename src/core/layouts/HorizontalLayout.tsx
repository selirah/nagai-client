import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import layoutActions from 'redux/layout/actions'
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, NavItem, Button } from 'reactstrap'
import themeConfig from 'theme/themeConfig'
import Customizer from '../components/customizer'
import NavbarComponent from './components/navbar'
import FooterComponent from './components/footer'
import MenuComponent from './components/menu/horizontal-menu'
import {
  useRTL,
  useLayoutMode,
  useNavbarType,
  useFooterType,
  useNavbarColor
} from 'hooks'
import 'core/scss/base/core/menu/menu-types/horizontal-menu.scss'

interface HorizontalLayoutProps {
  navbar: any
  footer: any
  menu: any
  currentActiveItem: any
  routerProps: any
  layout: any
  setLayout: (value: string) => void
  transition: any
  setTransition: (value: string) => void
  setMenuVisibility: (value: boolean) => void
}

const { handleMenuHidden, handleContentWidth } = layoutActions

const HorizontalLayout: React.FC<HorizontalLayoutProps> = (props) => {
  const {
    navbar,
    footer,
    menu,
    currentActiveItem,
    routerProps,
    layout,
    setLayout,
    transition,
    setTransition,
    setMenuVisibility,
    children
  } = props

  const [mode, setMode] = useLayoutMode()
  const [isRTL, setIsRTL] = useRTL()
  const [navbarType, setNavbarType] = useNavbarType()
  const [footerType, setFooterType] = useFooterType()
  const [navbarColor, setNavbarColor] = useNavbarColor()
  const [isMounted, setIsMounted] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const layoutStore = Selector((state) => state.layout)
  const contentWidth: any = layoutStore.contentWidth
  const isHidden = layoutStore.menuHidden

  const setContentWidth = useCallback(
    (value: any) => {
      dispatch(handleContentWidth(value))
    },
    [dispatch]
  )

  const setIsHidden = useCallback(
    (value: any) => {
      dispatch(handleMenuHidden(value))
    },
    [dispatch]
  )

  const cleanup = useCallback(() => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', function () {
      if (this.window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (this.window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const footerClasses: any = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  const navbarWrapperClasses: any = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static'
  }

  const navbarClasses: any = {
    floating: 'floating-nav',
    sticky: 'fixed-top'
  }

  const bgColorCondition =
    navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${
          navbarWrapperClasses[navbarType] || 'navbar-floating'
        } ${footerClasses[footerType] || 'footer-static'} menu-expanded`
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      <Navbar
        expand="lg"
        className={classnames(
          'header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center',
          {
            'navbar-scrolled': navbarScrolled
          }
        )}
      >
        {!navbar && (
          <div className="navbar-header d-xl-block d-none">
            <ul className="nav navbar-nav">
              <NavItem>
                <Link to="/" className="navbar-brand">
                  <span className="brand-logo">
                    <img src={themeConfig.app.appLogo} alt="logo" />
                  </span>
                  <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}
        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar
          ) : (
            <NavbarComponent
              mode={mode}
              setMode={setMode}
              setMenuVisibility={setMenuVisibility}
            />
          )}
        </div>
      </Navbar>
      {isHidden ? (
        <div className="horizontal-menu-wrapper">
          <Navbar
            tag="div"
            expand="sm"
            light={mode !== 'dark'}
            dark={mode === 'dark' || bgColorCondition}
            className={classnames(
              `header-navbar navbar-horizontal navbar-shadow menu-border`,
              {
                [navbarClasses[navbarType]]: navbarType !== 'static',
                'floating-nav':
                  (!navbarClasses[navbarType] && navbarType !== 'static') ||
                  navbarType === 'floating'
              }
            )}
          >
            {menu ? (
              menu
            ) : (
              <MenuComponent
                routerProps={routerProps}
                currentActiveItem={currentActiveItem}
              />
            )}
          </Navbar>
        </div>
      ) : null}
      {children}
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
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          contentWidth={contentWidth}
          setContentWidth={setContentWidth}
          transition={transition}
          setTransition={setTransition}
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

export default HorizontalLayout
