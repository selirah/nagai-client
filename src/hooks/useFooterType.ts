import { useState } from 'react'
import themeConfig from 'theme/themeConfig'

export const useFooterType = () => {
  const [footerType, setFooterType] = useState(() => {
    try {
      return themeConfig.layout.footer.type
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(footerType) : value
      setFooterType(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  return [footerType, setValue]
}
