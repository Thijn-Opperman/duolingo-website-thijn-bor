'use client'

interface PlaceholderProps {
  label: string
  aspectRatio?: string
  color?: string
  className?: string
}

export default function Placeholder({ label, aspectRatio = '16/9', color = '#58CC02', className = '' }: PlaceholderProps) {
  return (
    /* TODO: vervang door echte afbeelding */
    <div
      className={`relative flex items-center justify-center rounded-xl overflow-hidden ${className}`}
      style={{ aspectRatio, background: `${color}18`, border: `2px dashed ${color}60` }}
    >
      <div className="text-center px-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: `${color}30` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <p className="text-sm font-semibold" style={{ color, fontFamily: 'var(--font-inter)' }}>
          {label}
        </p>
        <p className="text-xs mt-1 opacity-60" style={{ color, fontFamily: 'var(--font-inter)' }}>
          TODO: vervang door echte afbeelding
        </p>
      </div>
    </div>
  )
}
