import { useEffect, useState, createContext } from 'react'

const ThemeColors = createContext({})

const ThemeContext: React.FC = ({ children }) => {
  const [colors, setColors] = useState({})

  useEffect(() => {
    const getHex = (color: any) => window.getComputedStyle(document.body).getPropertyValue(color).trim()

    const obj = {
      primary: {
        light: getHex('--primary').concat('1a'),
        main: getHex('--primary')
      },
      secondary: {
        light: getHex('--secondary').concat('1a'),
        main: getHex('--secondary')
      },
      success: {
        light: getHex('--success').concat('1a'),
        main: getHex('--success')
      },
      danger: {
        light: getHex('--danger').concat('1a'),
        main: getHex('--danger')
      },
      warning: {
        light: getHex('--warning').concat('1a'),
        main: getHex('--warning')
      },
      info: {
        light: getHex('--info').concat('1a'),
        main: getHex('--info')
      },
      dark: {
        light: getHex('--dark').concat('1a'),
        main: getHex('--dark')
      }
    }
    setColors({ ...obj })
  }, [])

  return <ThemeColors.Provider value={{ colors }}>{children}</ThemeColors.Provider>
}

export { ThemeColors, ThemeContext }
