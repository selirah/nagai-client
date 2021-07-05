import { useContext, useCallback } from 'react'
//@ts-ignore
import CountryFlag from 'react-country-flag'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
import { IntlContext } from 'contexts/i18n'

const langObj: any = {
  en: 'English',
  fr: 'French'
}

const IntlDropdown = () => {
  const intlContext = useContext(IntlContext)

  const handleSwitchLanguage = useCallback(
    (lang: 'en' | 'fr') => {
      intlContext.switchLanguage(lang)
    },
    [intlContext]
  )

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <CountryFlag
          className="country-flag flag-icon"
          countryCode={intlContext.locale === 'en' ? 'us' : intlContext.locale}
          svg
        />
        <span className="selected-language">{langObj[intlContext.locale]}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" right>
        <DropdownItem
          href="/"
          tag="a"
          onClick={() => handleSwitchLanguage('en')}
        >
          <CountryFlag className="country-flag" countryCode="us" svg />
          <span className="ml-1">English</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={() => handleSwitchLanguage('fr')}
        >
          <CountryFlag className="country-flag" countryCode="fr" svg />
          <span className="ml-1">French</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
