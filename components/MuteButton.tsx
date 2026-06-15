'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { getMuted, setMuted } from '@/lib/audio'

export default function MuteButton() {
  const [muted, setMutedState] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setMutedState(getMuted())
  }, [])

  if (!mounted) return <div className="w-9 h-9" />

  const toggle = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Geluid aan' : 'Geluid uit'}
      title={muted ? 'Geluid aan' : 'Geluid uit'}
      className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
      style={{ background: 'var(--bg-secondary)', color: muted ? 'var(--text-secondary)' : 'var(--duo-green)' }}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  )
}
