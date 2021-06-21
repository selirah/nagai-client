import React, { useState, useEffect } from 'react'
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

interface HorizontalLayoutProps {}

const { handleMenuHidden, handleContentWidth } = layoutActions

const HorizontalLayout: React.FC<HorizontalLayoutProps> = ({}) => {
  return <h1>Hey</h1>
}

export default HorizontalLayout
