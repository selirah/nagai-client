import { useState, useEffect } from 'react'
import themeConfig from '@theme/themeConfig'
import { useDispatch } from 'react-redux'
import { /*Selector,*/ Dispatch } from '@redux/selector-dispatch'
import layoutActions from '@redux/layout/actions'

const { handleLayoutMode } = layoutActions

export const useLayoutMode = () => {
  const dispatch: Dispatch = useDispatch()
  // const { mode } = Selector((state) => state.layout)
  const [layoutMode, setLayoutMode] = useState<any>(() => {
    try {
      const skin = window.localStorage.getItem('mode')
      return skin ? JSON.parse(skin) : themeConfig.layout.mode
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(layoutMode) : value
      setLayoutMode(valueToStore)
      dispatch(handleLayoutMode(valueToStore))
      window.localStorage.setItem('mode', JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const element = window.document.body
    const classNames: any = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout'
    }
    element.classList.remove(...element.classList)

    // ** If mode is not light add mode class
    if (layoutMode !== undefined && layoutMode !== 'light') {
      element.classList.add(classNames[layoutMode])
    }
  }, [layoutMode])

  return [layoutMode, setValue]
}
