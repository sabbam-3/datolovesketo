import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const messages = [
  { text: 'Sonya...', heart: '💕' },
  { text: 'We have been together for 1 month already but.....', heart: '💗' },
  { text: 'It was 31 amazing days spent with you...', heart: '💖' },
  { text: 'There were hours of not seeing you and...', heart: '💘' },
  { text: 'I missed you...', heart: '💓' },
  { text: 'So please try not to spend any other second without me...', heart: '💞' },
  { text: 'I love you to the moon and back.', heart: '💝' },
]

interface MessageSequenceProps {
  onComplete: () => void
}

export default function MessageSequence({ onComplete }: MessageSequenceProps) {
  const [index, setIndex] = useState(0)

  const isLast = index === messages.length - 1
  const { text, heart } = messages[index]

  const handleNext = () => {
    if (isLast) {
      onComplete()
    } else {
      setIndex(i => i + 1)
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-8 sm:p-10 min-h-[350px] flex flex-col items-center justify-center text-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {heart}
            </motion.span>
            <p
              className={`font-handwritten text-2xl sm:text-3xl text-warm-gray leading-relaxed max-w-sm ${
                index === 0 ? 'text-rose-deep text-3xl sm:text-4xl' : ''
              } ${isLast ? 'text-rose-deep text-3xl sm:text-4xl' : ''}`}
            >
              {text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={handleNext}
        className="mt-8 px-8 py-3 bg-rose-deep text-white rounded-button font-handwritten font-semibold text-lg cursor-pointer shadow-romantic hover:bg-rose-dark transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isLast ? 'Continue 💝' : 'Next'}
      </motion.button>

      <div className="flex gap-1.5 mt-5">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i <= index ? 'bg-rose-deep' : 'bg-rose-light'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
