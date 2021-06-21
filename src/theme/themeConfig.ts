const themeConfig = {
  app: {
    appName: 'Nagai',
    appLogo: require('assets/images/logo/logo.svg').default
  },
  layout: {
    isRTL: false,
    mode: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: '#fff' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'sticky' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
