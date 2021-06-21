import { useState } from 'react'
import themeConfig from 'theme/themeConfig'

export const useRouterTransition = () => {
  // ** State
  const [transition, setTransition] = useState(() => {
    try {
      return themeConfig.layout.routerTransition
    } catch (error) {
      console.log(error)
      return themeConfig.layout.routerTransition
    }
  })

  // ** Return a wrapped version of useState's setter function
  const setValue = (value: any) => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(transition) : value

      // ** Set state
      setTransition(valueToStore)
    } catch (error) {
      // ** A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [transition, setValue]
}
