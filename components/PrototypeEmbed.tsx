'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PrototypeEmbedProps {
  type: 'iframe' | 'images'
  src?: string
  deviceType: 'desktop' | 'mobile'
  accentColor?: string
}

export default function PrototypeEmbed({ type, src, deviceType, accentColor = '#58CC02' }: PrototypeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (type === 'iframe' && src) {
    return (
      <div className="w-full">
        {deviceType === 'desktop' ? (
          /* Desktop browser frame */
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '2px solid var(--border)', boxShadow: '0 8px 0 var(--shadow)' }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div
                className="flex-1 mx-4 px-3 py-1 rounded-lg text-xs"
                style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
              >
                {/* TODO: vervang door jullie prototype URL */}
                prototype.figma.com/...
              </div>
            </div>
            {/* Iframe */}
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-8 h-8 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: accentColor }}
                  />
                </div>
              )}
              <iframe
                src={src}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                allow="fullscreen"
                onLoad={() => setLoaded(true)}
                title="Prototype"
              />
            </div>
          </div>
        ) : (
          /* Mobile frame */
          <div className="flex justify-center">
            <div
              className="relative"
              style={{
                width: 320,
                background: 'var(--bg-tertiary)',
                borderRadius: 40,
                border: '8px solid var(--border)',
                boxShadow: '0 12px 0 var(--shadow)',
                overflow: 'hidden',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                style={{ width: 120, height: 28, background: 'var(--bg-tertiary)', borderRadius: '0 0 16px 16px' }}
              />
              {/* Screen */}
              <div style={{ paddingTop: 28, paddingBottom: 24, height: 580, position: 'relative' }}>
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-8 h-8 rounded-full border-2 border-transparent"
                      style={{ borderTopColor: accentColor }}
                    />
                  </div>
                )}
                <iframe
                  src={src}
                  className="w-full h-full"
                  loading="lazy"
                  allow="fullscreen"
                  onLoad={() => setLoaded(true)}
                  title="Prototype"
                />
              </div>
              {/* Home bar */}
              <div className="flex justify-center pb-3">
                <div className="w-24 h-1 rounded-full" style={{ background: 'var(--border)' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* Placeholder when no src */
  return (
    /* TODO: vervang src door jullie prototype URL */
    <div
      className="rounded-xl flex flex-col items-center justify-center text-center p-10"
      style={{
        border: `2px dashed ${accentColor}60`,
        background: `${accentColor}08`,
        minHeight: 300,
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${accentColor}20` }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>
      <p className="font-bold mb-1" style={{ color: accentColor, fontFamily: 'var(--font-nunito)', fontSize: 16 }}>
        Prototype
      </p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}>
        TODO: vervang door jullie prototype URL
      </p>
    </div>
  )
}
