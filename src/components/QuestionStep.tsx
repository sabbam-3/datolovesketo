import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import DodgingButton from './DodgingButton'

const yesHearts = ['💕', '💗', '💖', '💘']

interface QuestionStepProps {
  onYes: () => void
}

export default function QuestionStep({ onYes }: QuestionStepProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [attempts, setAttempts] = useState(0)

  const yesScale = Math.min(1 + attempts * 0.06, 1.8)
  const heartCount = Math.min(1 + Math.floor(attempts / 2), 4)

  return (
    <div
      ref={containerRef}
      className="relative bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-8 min-h-[420px] overflow-hidden flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-6 z-10">
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💓
        </motion.span>

        <h1 className="font-handwritten text-3xl sm:text-4xl font-bold text-warm-gray text-center leading-tight">
          წამოხვალ ჩემთან
          <br />
          პაემანზე?
        </h1>

        <div className="flex items-center gap-4 mt-4 flex-wrap justify-center">
          <motion.button
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={onYes}
            className="px-8 py-3 bg-rose-deep text-white rounded-button font-handwritten font-bold text-lg cursor-pointer shadow-romantic hover:bg-rose-dark transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: yesScale * 0.95 }}
          >
            Yes {yesHearts.slice(0, heartCount).join('')}
          </motion.button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <DodgingButton
          containerRef={containerRef}
          onDodge={() => setAttempts(a => a + 1)}
        />
      </div>
    </div>
  )
}
