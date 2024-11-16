"use client"

import { createContext, useContext, useState } from "react"

type NavigationContextType = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const NavigationContext = createContext<NavigationContextType>({
  isOpen: false,
  toggle: () => null,
  close: () => null,
})

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return (
    <NavigationContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider")
  }
  return context
}