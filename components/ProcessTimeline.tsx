'use client'

import { motion } from 'framer-motion'
import { type ProcessStep } from '@/lib/concepts'
import { useLanguage } from '@/lib/LanguageContext'
import Placeholder from './Placeholder'

interface ProcessTimelineProps {
  steps: ProcessStep[]
  accentColor: string
}

export default function ProcessTimeline({ steps, accentColor }: ProcessTimelineProps) {
  const { lang } = useLanguage()

  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
        style={{ background: `${accentColor}30` }}
      />

      <div className="flex flex-col gap-12">
        {steps.map((step, i) => {
          const isEven = i % 2 === 0

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: isEven ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex flex-col md:flex-row gap-6 md:gap-10"
            >
              {/* Step circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  background: accentColor,
                  boxShadow: `0 4px 0 ${accentColor}60`,
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 900,
                  fontSize: 16,
                  color: '#fff',
                }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: `${accentColor}18`,
                      color: accentColor,
                      fontFamily: 'var(--font-inter)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {step.tag}
                  </span>
                </div>

                <h4
                  className="text-lg mb-2"
                  style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, color: 'var(--text-primary)' }}
                >
                  {step.title[lang]}
                </h4>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                >
                  {/* TODO: voeg per stap echte tekst toe over jullie proces */}
                  {step.description[lang]}
                </p>

                {/* Image placeholder */}
                {/* TODO: vervang placeholder door echte process-foto's */}
                <Placeholder
                  label={`${step.title[lang]} — afbeelding`}
                  aspectRatio="16/7"
                  color={accentColor}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
