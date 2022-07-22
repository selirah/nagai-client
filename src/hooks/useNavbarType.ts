import { useState } from 'react'
import themeConfig from '@theme/themeConfig'

export const useNavbarType = () => {
  const [navbarType, setNavbarType] = useState<any>(() => {
    try {
      return themeConfig.layout.navbar.type
    } catch (error) {
      console.log(error)
      return themeConfig.layout.navbar.type
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
