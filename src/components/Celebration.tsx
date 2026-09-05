import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

interface CelebrationProps {
  onComplete: () => void
}

const heartEmojis = ['💕', '💗', '💖', '💘', '💝', '💓', '💞']

function FloatingHeart({ delay, x, size, emoji }: { delay: number; x: number; size: number; emoji: string }) {
  return (
    <motion.div
      className="absolute text-rose-deep pointer-events-none select-none"
      style={{ left: `${x}%`, fontSize: size, bottom: -40 }}
      initial={{ y: 0, opacity: 0, rotate: Math.random() * 40 - 20 }}
      animate={{
        y: -700,
        opacity: [0, 1, 1, 0],
        rotate: Math.random() * 60 - 30,
        x: Math.random() * 80 - 40,
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.div>
  )
}

export default function Celebration({ onComplete }: CelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500)
    return () => clearTimeout(timer)
  }, [onComplete])

  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: Math.random() * 1.2,
        x: Math.random() * 90 + 5,
        size: 16 + Math.random() * 24,
        emoji: heartEmojis[i % heartEmojis.length],
      })),
    []
  )

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-8 min-h-[420px] overflow-hidden flex flex-col items-center justify-center">
      {hearts.map(h => (
        <FloatingHeart key={h.id} delay={h.delay} x={h.x} size={h.size} emoji={h.emoji} />
      ))}

      <motion.div
        className="z-10 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <motion.p
          className="text-7xl mb-4"
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          🎉
        </motion.p>
        <h1 className="font-handwritten text-5xl sm:text-6xl font-bold text-rose-deep mb-3">
          ურაა!
        </h1>
        <motion.p
          className="font-handwritten text-2xl sm:text-3xl text-warm-gray"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          პაემანია!
        </motion.p>
      </motion.div>
    </div>
  )
}
