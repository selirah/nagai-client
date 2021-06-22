import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import layoutActions from 'redux/layout/actions'
import { Selector, Dispatch } from 'redux/selector-dispatch'

const { handleRTL } = layoutActions

export const useRTL = () => {
  const dispatch: Dispatch = useDispatch()
  const layout = Selector((state) => state.layout)
  const isRTL: any = layout.isRTL

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(isRTL) : value
      dispatch(handleRTL(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const element = document.getElementsByTagName('html')[0]

    if (isRTL) {
      element.setAttribute('dir', 'rtl')
    } else {
      element.setAttribute('dir', 'ltr')
    }
  }, [isRTL])

  return [isRTL, setValue]
}
