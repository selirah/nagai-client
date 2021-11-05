import React, { Fragment, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import layoutActions from '@redux/layout/actions'
import 'animate.css/animate.css'

interface LayoutWrapperProps {
  layout: 'HorizontalLayout' | 'VerticalLayout'
  appLayout?: boolean
  wrapperClass?: any
  transition: any
  routeMeta?: any
  setTransition: (value: any) => void
}

const { handleContentWidth, handleMenuCollapsed, handleMenuHidden } =
  layoutActions

const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
  const { layout, appLayout, wrapperClass, transition, routeMeta, children } =
    props
  const dispatch: Dispatch = useDispatch()
  const layoutStore = Selector((state) => state.layout)
  const navbarStore = Selector((state) => state.navbar)
  const { contentWidth } = layoutStore
  const { query } = navbarStore

  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

  // ** Clean Up Function
  const cleanUp = useCallback(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth('full'))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden))
      }
    }
  }, [routeMeta, dispatch])

  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [wrapperClass]: wrapperClass,
        'show-overflow': query.length
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow"></div>
      <div
        className={classnames({
          'content-wrapper': !appLayout,
          'content-area-wrapper': appLayout,
          'container p-0': contentWidth === 'boxed',
          [`animate__animated animate__${transition}`]:
            transition !== 'none' && transition.length
        })}
      >
        <Tag
          {...(layout === 'HorizontalLayout' && !appLayout
            ? { className: classnames({ 'content-body': !appLayout }) }
            : null)}
        >
          {children}
        </Tag>
      </div>
    </div>
  )
}

export default LayoutWrapper
