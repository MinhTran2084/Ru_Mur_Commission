import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext({ lang: 'vi', setLang: () => {}, pick: (v) => v })

function readStored() {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'vi'
  } catch {
    return 'vi'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readStored)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  // Plain strings are returned as they are; { vi, en } objects pick the current
  // language and fall back to Vietnamese.
  const pick = (value) => {
    if (value == null || typeof value === 'string') return value
    return value[lang] ?? value.vi
  }

  return <LangContext.Provider value={{ lang, setLang, pick }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)