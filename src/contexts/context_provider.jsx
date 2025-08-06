'use client'

import { useState } from 'react'
import AppContext from './contexts'

const ContextProvider = ({children}) => {
  const [darkMode,setDarkMode] = useState(true)
  return (
    <AppContext.Provider value={{darkMode,setDarkMode}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextProvider