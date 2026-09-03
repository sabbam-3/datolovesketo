import { motion } from 'framer-motion'
import type { DateType } from '../types/date'
import { dateTypes } from '../data/dateTypes'

interface DateTypeSelectionProps {
  onSelect: (dateType: DateType) => void
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
}

export default function DateTypeSelection({ onSelect }: DateTypeSelectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-6 sm:p-8">
      <h2 className="font-handwritten text-2xl sm:text-3xl font-bold text-warm-gray text-center mb-6">
        What kind of a date?
      </h2>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dateTypes.map(dt => (
          <motion.button
            key={dt.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(dt)}
            className="flex flex-col items-center gap-2 p-5 sm:p-6 bg-white rounded-card shadow-card hover:shadow-card-hover cursor-pointer border border-rose-light/50 transition-shadow"
          >
            <span className="text-3xl sm:text-4xl">{dt.emoji}</span>
            <span className="font-handwritten font-semibold text-warm-gray text-sm sm:text-base">
              {dt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
