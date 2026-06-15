// Web Audio API utilities — browser-only, safe to import from 'use client' components

let _ctx: AudioContext | null = null
let _muted = false
let _ready = false // AudioContext resumed after user interaction

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!_ctx) {
    try {
      _ctx = new AudioContext()
    } catch {
      return null
    }
  }
  return _ctx
}

function tryResume() {
  const c = getCtx()
  if (c && c.state === 'suspended') {
    c.resume().then(() => { _ready = true })
  } else if (c && c.state === 'running') {
    _ready = true
  }
}

/** Call once on mount (inside useEffect) to wire up interaction listeners. */
export function initAudio() {
  if (typeof window === 'undefined') return
  const saved = localStorage.getItem('duoproject-muted')
  if (saved !== null) _muted = saved === '1'

  const handler = () => { tryResume() }
  document.addEventListener('click', handler, { passive: true })
  document.addEventListener('keydown', handler, { passive: true })
}

export function getMuted(): boolean {
  return _muted
}

export function setMuted(val: boolean) {
  _muted = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('duoproject-muted', val ? '1' : '0')
  }
}

function playTone(freq: number, dur: number, vol = 0.28, offset = 0) {
  const c = getCtx()
  if (!c || _muted || !_ready) return
  const t = c.currentTime + offset
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain)
  gain.connect(c.destination)
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.start(t)
  osc.stop(t + dur + 0.01)
}

/** Short sine blip on XP gain. */
export function playXPBlip() {
  playTone(660, 0.08)
}

/** Two-note ding-ding on level up. */
export function playLevelUp() {
  playTone(523, 0.2, 0.4, 0)      // C5
  playTone(784, 0.22, 0.4, 0.15)  // G5
}

// ── Intro screen sfx ────────────────────────────────────────────────────────

function playNoise(dur: number, vol = 0.15, offset = 0) {
  const c = getCtx()
  if (!c || _muted || !_ready) return
  const bufLen = Math.ceil(c.sampleRate * dur)
  const buf = c.createBuffer(1, bufLen, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const gain = c.createGain()
  src.connect(gain)
  gain.connect(c.destination)
  const t = c.currentTime + offset
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.start(t)
  src.stop(t + dur + 0.01)
}

/** Button press: short white noise click. */
export function sfxClick() {
  playNoise(0.04, 0.2)
}

/** SVG drawing: quiet rising sine sweep (2s). */
export function sfxDraw() {
  const c = getCtx()
  if (!c || _muted || !_ready) return
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.connect(gain)
  gain.connect(c.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(220, t)
  osc.frequency.linearRampToValueAtTime(440, t + 2)
  gain.gain.setValueAtTime(0.06, t)
  gain.gain.setValueAtTime(0.06, t + 1.6)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 2)
  osc.start(t)
  osc.stop(t + 2.05)
}

/** Crack/fill: noise burst + blip. */
export function sfxCrack() {
  playNoise(0.12, 0.22)
  playTone(880, 0.07, 0.15, 0.08)
}

/** Confetti burst: 120ms noise. */
export function sfxBurst() {
  playNoise(0.12, 0.25)
}

/** XP bar fill: 5 ascending blips. */
export function sfxBar() {
  const freqs = [330, 392, 440, 523, 659]
  freqs.forEach((f, i) => playTone(f, 0.07, 0.2, i * 0.1))
}

/** Curtain reveal: C5 + G5 ding-ding (same as level-up but louder). */
export function sfxReveal() {
  playTone(523, 0.25, 0.5, 0)
  playTone(784, 0.28, 0.5, 0.18)
}
