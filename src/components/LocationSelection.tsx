import { motion } from 'framer-motion'
import type { LocationChoice } from '../types/date'
import { locationChoices } from '../data/locations'

interface LocationSelectionProps {
  onSelect: (location: LocationChoice) => void
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function LocationSelection({ onSelect }: LocationSelectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-6 sm:p-8">
      <h2 className="font-handwritten text-2xl sm:text-3xl font-bold text-warm-gray text-center mb-6">
        სად წავიდეთ?
      </h2>

      <motion.div
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {locationChoices.map(loc => (
          <motion.button
            key={loc.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(loc)}
            className={`flex items-center gap-4 p-4 sm:p-5 bg-white rounded-card shadow-card hover:shadow-card-hover cursor-pointer border transition-shadow text-left ${
              loc.id === 'surprise'
                ? 'border-gold/60 bg-gradient-to-r from-white to-cream'
                : 'border-rose-light/50'
            }`}
          >
            <span className="text-2xl sm:text-3xl">{loc.emoji}</span>
            <span className="font-handwritten font-semibold text-warm-gray text-base sm:text-lg">
              {loc.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
