import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { surpriseLocations, spinnerLocations } from '../data/surpriseLocations'

interface SurpriseLocationProps {
  onComplete: (result: string) => void
}

type Phase = 'spinning' | 'slowing' | 'revealed'

export default function SurpriseLocation({ onComplete }: SurpriseLocationProps) {
  const [phase, setPhase] = useState<Phase>('spinning')
  const [currentText, setCurrentText] = useState(spinnerLocations[0])
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const indexRef = useRef(0)

  const finalResult = useMemo(
    () => surpriseLocations[Math.floor(Math.random() * surpriseLocations.length)],
    []
  )

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % spinnerLocations.length
      setCurrentText(spinnerLocations[indexRef.current])
    }, 100)

    const slowTimer = setTimeout(() => {
      setPhase('slowing')
    }, 1500)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      clearTimeout(slowTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'slowing') return

    if (intervalRef.current) clearInterval(intervalRef.current)

    const delays = [200, 350, 550, 800]
    let step = 0

    const tick = () => {
      if (step < delays.length) {
        indexRef.current = (indexRef.current + 1) % spinnerLocations.length
        setCurrentText(spinnerLocations[indexRef.current])
        setTimeout(tick, delays[step])
        step++
      } else {
        setCurrentText(finalResult)
        setTimeout(() => setPhase('revealed'), 300)
      }
    }

    tick()
  }, [phase, finalResult])

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-8 min-h-[350px] flex flex-col items-center justify-center text-center">
      {phase !== 'revealed' && (
        <motion.p
          className="font-handwritten text-xl text-warm-gray/70 mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          იდეალურ ადგილს ვეძებ...
        </motion.p>
      )}

      <div className="h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: phase === 'spinning' ? 0.08 : 0.2 }}
            className={`font-handwritten text-xl sm:text-2xl font-bold ${
              phase === 'revealed' ? 'text-rose-deep' : 'text-warm-gray'
            }`}
          >
            {currentText}
          </motion.p>
        </AnimatePresence>
      </div>

      {phase === 'revealed' && (
        <motion.div
          className="mt-8 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <p className="text-4xl">✨</p>
          <p className="font-handwritten text-lg text-warm-gray/70">ავირჩიე...</p>
          <p className="font-handwritten text-2xl sm:text-3xl font-bold text-rose-deep">
            {finalResult}
          </p>
          <motion.button
            onClick={() => onComplete(finalResult)}
            className="mt-4 px-8 py-3 bg-rose-deep text-white rounded-button font-handwritten font-semibold text-lg cursor-pointer shadow-romantic hover:bg-rose-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            იდეალურია! 💖
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
