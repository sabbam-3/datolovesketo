import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { DateSelections } from '../types/date'

interface FinalResultProps {
  selections: DateSelections
}

const heartEmojis = ['💕', '💗', '💖', '💘', '💝', '💓', '💞']

function FloatingHeart({ delay, x, size, emoji }: { delay: number; x: number; size: number; emoji: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-20"
      style={{ left: `${x}%`, fontSize: size, bottom: -20 }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -500, opacity: [0, 0.2, 0.15, 0] }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.div>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.2, duration: 0.5 },
  }),
}

export default function FinalResult({ selections }: FinalResultProps) {
  const { dateType, location, surpriseResult, dateTime } = selections

  const locationText = surpriseResult || location?.label || ''
  const locationEmoji = surpriseResult ? '✨' : location?.emoji || ''

  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        x: Math.random() * 90 + 5,
        size: 14 + Math.random() * 16,
        emoji: heartEmojis[i % heartEmojis.length],
      })),
    []
  )

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-8 sm:p-10 min-h-[350px] overflow-hidden flex flex-col items-center justify-center text-center">
      {hearts.map(h => (
        <FloatingHeart key={h.id} delay={h.delay} x={h.x} size={h.size} emoji={h.emoji} />
      ))}

      <div className="z-10 flex flex-col items-center gap-5">
        <motion.p
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="font-handwritten text-3xl sm:text-4xl font-bold text-rose-deep"
        >
          იდეალურია 💝
        </motion.p>

        {dateType && (
          <motion.div
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 text-2xl sm:text-3xl"
          >
            <span>{dateType.emoji}</span>
            <span className="font-handwritten font-bold text-warm-gray">
              {dateType.label}
            </span>
          </motion.div>
        )}

        <motion.div
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 text-lg sm:text-xl"
        >
          <span>{locationEmoji}</span>
          <span className="font-handwritten font-semibold text-warm-gray/80">{locationText}</span>
        </motion.div>

        {dateTime && (
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 text-lg sm:text-xl"
          >
            <span>📅</span>
            <span className="font-handwritten font-semibold text-warm-gray/80">
              {dateTime.date} &middot; {dateTime.time}
            </span>
          </motion.div>
        )}

        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="font-handwritten text-2xl sm:text-3xl text-rose-deep mt-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            პაემანია!
          </motion.p>
        </motion.div>

        <motion.p
          custom={5}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-sm text-warm-gray/50 mt-6"
        >
          გადაიღე სქრინშოტი და გამომიგზავნე 💌
        </motion.p>
      </div>
    </div>
  )
}
