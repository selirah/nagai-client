import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import layoutActions from 'redux/layout/actions'
import 'animate.css/animate.css'

interface LayoutWrapperProps {
  layout: 'HorizontalLayout' | 'VerticalLayout'
  appLayout: boolean
  wrapperClass: any
  transition: 'fadeIn' | 'fadeInLeft' | 'zoomIn' | 'none'
  routeMeta: any
}

const { handleContentWidth, handleMenuCollapsed, handleMenuHidden } =
  layoutActions

const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
  const { layout, appLayout, wrapperClass, transition, routeMeta, children } =
    props
  const dispatch: Dispatch = useDispatch
  const layoutStore = Selector((state) => state.layout)
  const { contentWidth, query } = layoutStore

  const Tag = layout === 'HorizontalLayout' && !appLayout ? 'div' : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
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
  }

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
