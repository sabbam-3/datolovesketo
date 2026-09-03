import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ExperienceStep, DateType, LocationChoice, DateSelections } from '../types/date'
import QuestionStep from './QuestionStep'
import Celebration from './Celebration'
import MessageSequence from './MessageSequence'
import DateTypeSelection from './DateTypeSelection'
import LocationSelection from './LocationSelection'
import SurpriseLocation from './SurpriseLocation'
import DateTimePicker from './DateTimePicker'
import FinalResult from './FinalResult'

const stepTransition = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.97 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
}

export default function DateExperience() {
  const [step, setStep] = useState<ExperienceStep>('messages')
  const [selections, setSelections] = useState<DateSelections>({
    dateType: null,
    location: null,
    surpriseResult: null,
    dateTime: null,
  })

  const handleYes = () => setStep('celebration')

  const handleMessagesComplete = () => setStep('question')

  const handleCelebrationComplete = () => setStep('dateType')

  const handleDateTypeSelect = (dateType: DateType) => {
    setSelections(prev => ({ ...prev, dateType }))
    setStep('location')
  }

  const handleLocationSelect = (location: LocationChoice) => {
    setSelections(prev => ({ ...prev, location }))
    setStep(location.id === 'surprise' ? 'surprise' : 'dateTime')
  }

  const handleSurpriseComplete = (result: string) => {
    setSelections(prev => ({ ...prev, surpriseResult: result }))
    setStep('dateTime')
  }

  const handleDateTimeSelect = (dateTime: { date: string; time: string }) => {
    setSelections(prev => ({ ...prev, dateTime }))
    setStep('summary')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {step === 'question' && (
          <motion.div key="question" {...stepTransition}>
            <QuestionStep onYes={handleYes} />
          </motion.div>
        )}

        {step === 'celebration' && (
          <motion.div key="celebration" {...stepTransition}>
            <Celebration onComplete={handleCelebrationComplete} />
          </motion.div>
        )}

        {step === 'messages' && (
          <motion.div key="messages" {...stepTransition}>
            <MessageSequence onComplete={handleMessagesComplete} />
          </motion.div>
        )}

        {step === 'dateType' && (
          <motion.div key="dateType" {...stepTransition}>
            <DateTypeSelection onSelect={handleDateTypeSelect} />
          </motion.div>
        )}

        {step === 'location' && (
          <motion.div key="location" {...stepTransition}>
            <LocationSelection onSelect={handleLocationSelect} />
          </motion.div>
        )}

        {step === 'surprise' && (
          <motion.div key="surprise" {...stepTransition}>
            <SurpriseLocation onComplete={handleSurpriseComplete} />
          </motion.div>
        )}

        {step === 'dateTime' && (
          <motion.div key="dateTime" {...stepTransition}>
            <DateTimePicker onSelect={handleDateTimeSelect} />
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.div key="summary" {...stepTransition}>
            <FinalResult selections={selections} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
