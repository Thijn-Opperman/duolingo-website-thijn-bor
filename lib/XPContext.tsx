'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

interface XPNotification {
  id: number
  amount: number
  reason: string
}

interface XPState {
  xp: number
  visitedConcepts: number[]
  notifications: XPNotification[]
  addXP: (amount: number, reason: string) => void
  markConceptVisited: (id: number) => void
  dismissNotification: (id: number) => void
}

const XPContext = createContext<XPState | null>(null)

let notifId = 0

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0)
  const [visitedConcepts, setVisitedConcepts] = useState<number[]>([])
  const [notifications, setNotifications] = useState<XPNotification[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const savedXP = localStorage.getItem('duoproject-xp')
    const savedVisited = localStorage.getItem('duoproject-visited')
    if (savedXP) setXP(parseInt(savedXP, 10))
    if (savedVisited) setVisitedConcepts(JSON.parse(savedVisited))
  }, [])

  const addXP = useCallback((amount: number, reason: string) => {
    setXP((prev) => {
      const next = prev + amount
      localStorage.setItem('duoproject-xp', String(next))
      return next
    })
    const id = ++notifId
    setNotifications((prev) => [...prev, { id, amount, reason }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }, [])

  const markConceptVisited = useCallback(
    (id: number) => {
      setVisitedConcepts((prev) => {
        if (prev.includes(id)) return prev
        const next = [...prev, id]
        localStorage.setItem('duoproject-visited', JSON.stringify(next))
        return next
      })
    },
    []
  )

  const dismissNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <XPContext.Provider value={{ xp, visitedConcepts, notifications, addXP, markConceptVisited, dismissNotification }}>
      {children}
    </XPContext.Provider>
  )
}

export function useXP(): XPState {
  const ctx = useContext(XPContext)
  if (!ctx) throw new Error('useXP must be used within XPProvider')
  return ctx
}
