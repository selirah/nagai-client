import React from 'react'
import NavbarUser from './NavbarUser'

interface ThemeNavbarProps {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  setMenuVisibility: (value: boolean) => void
}

const ThemeNavbar: React.FC<ThemeNavbarProps> = (props) => {
  const { mode, setMode, setMenuVisibility } = props
  return (
    <NavbarUser
      mode={mode}
      setMode={setMode}
      setMenuVisibility={setMenuVisibility}
    />
  )
}

export default ThemeNavbar
