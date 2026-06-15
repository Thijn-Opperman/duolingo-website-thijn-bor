'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { initAudio, playXPBlip, playLevelUp } from './audio'

export interface XPNotification {
  id: number
  amount: number
  reason: string
  isLevelUp: boolean
  newLevel?: number
}

interface XPState {
  xp: number
  level: number
  visitedConcepts: number[]
  notifications: XPNotification[]
  /** Always awards XP — use for non-deduplicated events. */
  addXP: (amount: number, reason: string) => void
  /** Awards XP only the first time for a given eventId (persisted in localStorage). */
  tryAddXP: (eventId: string, amount: number, reason: string) => void
  dismissNotification: (id: number) => void
}

const XPContext = createContext<XPState | null>(null)

let _notifId = 0

function levelOf(xp: number) {
  return Math.floor(xp / 100)
}

function visitedFromClaimed(claimed: string[]): number[] {
  return claimed
    .filter((e) => /^concept-\d+$/.test(e))
    .map((e) => parseInt(e.split('-')[1], 10))
}

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXP] = useState(0)
  const [claimedEvents, setClaimedEvents] = useState<string[]>([])
  const [notifications, setNotifications] = useState<XPNotification[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const savedXP = localStorage.getItem('duoproject-xp')
    const savedClaimed = localStorage.getItem('duoproject-claimed')

    if (savedXP) setXP(parseInt(savedXP, 10))
    if (savedClaimed) {
      try { setClaimedEvents(JSON.parse(savedClaimed)) } catch { /* ignore */ }
    }

    initAudio()
  }, [])

  const pushNotification = useCallback(
    (amount: number, reason: string, isLevelUp: boolean, newLevel?: number) => {
      const id = ++_notifId
      setNotifications((prev) => [...prev, { id, amount, reason, isLevelUp, newLevel }])
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, isLevelUp ? 3500 : 2500)
    },
    []
  )

  const awardXP = useCallback(
    (amount: number, reason: string) => {
      setXP((prev) => {
        const next = prev + amount
        localStorage.setItem('duoproject-xp', String(next))

        const didLevelUp = levelOf(next) > levelOf(prev)
        if (didLevelUp) {
          playLevelUp()
          pushNotification(amount, reason, true, levelOf(next))
        } else {
          playXPBlip()
          pushNotification(amount, reason, false)
        }
        return next
      })
    },
    [pushNotification]
  )

  const addXP = useCallback(
    (amount: number, reason: string) => { awardXP(amount, reason) },
    [awardXP]
  )

  const tryAddXP = useCallback(
    (eventId: string, amount: number, reason: string) => {
      setClaimedEvents((prev) => {
        if (prev.includes(eventId)) return prev
        const next = [...prev, eventId]
        localStorage.setItem('duoproject-claimed', JSON.stringify(next))
        awardXP(amount, reason)
        return next
      })
    },
    [awardXP]
  )

  const dismissNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const visitedConcepts = visitedFromClaimed(claimedEvents)
  const level = levelOf(xp)

  return (
    <XPContext.Provider
      value={{ xp, level, visitedConcepts, notifications, addXP, tryAddXP, dismissNotification }}
    >
      {children}
    </XPContext.Provider>
  )
}

export function useXP(): XPState {
  const ctx = useContext(XPContext)
  if (!ctx) throw new Error('useXP must be used within XPProvider')
  return ctx
}
