import { useState, useEffect } from 'react'
import themeConfig from 'theme/themeConfig'

export const useLayout = () => {
  const [lastLayout, setLastLayout] = useState<any>(null)
  const [layout, setLayout] = useState<any>(() => {
    try {
      return themeConfig.layout.type
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(layout) : value
      setLayout(valueToStore)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLayout = () => {
    if (layout === 'horizontal' && window.innerWidth <= 1200) {
      setLayout('vertical')
      setLastLayout('horizontal')
    }

    if (lastLayout === 'horizontal' && window.innerWidth >= 1200) {
      setLayout('horizontal')
    }
  }

  useEffect(() => {
    handleLayout()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleLayout)
  }, [layout, lastLayout])

  return [layout, setValue]
}
