import { useState } from 'react'
import themeConfig from 'theme/themeConfig'

export const useNavbarType = () => {
  const [navbarType, setNavbarType] = useState(() => {
    try {
      return themeConfig.layout.navbar.type
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(navbarType) : value
      setNavbarType(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [navbarType, setValue]
}
