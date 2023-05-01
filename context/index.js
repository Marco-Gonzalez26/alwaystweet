import { createContext, useState } from "react"

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Context.Provider
      value={{
        sidebarOpen,
        setSidebarOpen
      }}
    >
      {children}
    </Context.Provider>
  )
}
