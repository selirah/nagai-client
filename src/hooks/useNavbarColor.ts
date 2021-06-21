import { useState } from 'react'
import themeConfig from 'theme/themeConfig'

export const useNavbarColor = () => {
  const [navbarColor, setNavbarColor] = useState(() => {
    try {
      return themeConfig.layout.navbar.backgroundColor
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(navbarColor) : value
      setNavbarColor(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [navbarColor, setValue]
}
