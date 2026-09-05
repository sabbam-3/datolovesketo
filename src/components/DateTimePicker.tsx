import { useState } from 'react'
import { motion } from 'framer-motion'

interface DateTimePickerProps {
  onSelect: (dateTime: { date: string; time: string }) => void
}

const timeSlots = [
  { id: 'morning', label: 'დილა', time: '10:00', emoji: '🌅' },
  { id: 'afternoon', label: 'შუადღე', time: '14:00', emoji: '☀️' },
  { id: 'evening', label: 'საღამო', time: '18:00', emoji: '🌇' },
  { id: 'night', label: 'ღამე', time: '20:00', emoji: '🌙' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const FIXED_DATE = '6 სექტემბერი'

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleConfirm = () => {
    if (selectedTime) {
      onSelect({ date: FIXED_DATE, time: selectedTime })
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-card shadow-romantic p-6 sm:p-8">
      <h2 className="font-handwritten text-2xl sm:text-3xl font-bold text-warm-gray text-center mb-2">
        რომელ საათზე შევხვდეთ? 💗
      </h2>

      <p className="font-handwritten text-lg text-rose-deep text-center mb-6">
        📅 {FIXED_DATE}
      </p>

      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {timeSlots.map(slot => (
          <motion.button
            key={slot.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedTime(slot.label)}
            className={`flex flex-col items-center gap-1 p-4 rounded-card shadow-card cursor-pointer border transition-all ${
              selectedTime === slot.label
                ? 'border-rose-deep bg-rose-light/40 shadow-card-hover'
                : 'border-rose-light/50 bg-white hover:shadow-card-hover'
            }`}
          >
            <span className="text-2xl">{slot.emoji}</span>
            <span className="font-handwritten font-semibold text-warm-gray text-sm">
              {slot.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {selectedTime && (
        <motion.button
          onClick={handleConfirm}
          className="mt-6 w-full px-8 py-3 bg-rose-deep text-white rounded-button font-handwritten font-semibold text-lg cursor-pointer shadow-romantic hover:bg-rose-dark transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          იდეალურია 💖
        </motion.button>
      )}
    </div>
  )
}
