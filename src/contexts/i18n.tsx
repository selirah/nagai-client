import { useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import EN from 'locale/EN.json'
import FR from 'locale/FR.json'
import userEN from 'locale/EN.json'
import userFR from 'locale/FR.json'

type LocalContextValue = {
  switchLanguage(lang: 'en' | 'fr'): void
  locale: string
}

const menuMessages = {
  en: { ...EN, ...userEN },
  fr: { ...FR, ...userFR }
}

const LocaleContext = createContext<LocalContextValue>({} as LocalContextValue)

const i8nWrapper: React.FC = ({ children }) => {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState(menuMessages['en'])

  const switchLanguage = (lang: 'en' | 'fr') => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <LocaleContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}

export { i8nWrapper, LocaleContext as IntlContext }
