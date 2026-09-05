import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const noTexts = [
  'არა',
  'ნამდვილად არა?',
  'დარწმუნებული ხარ?',
  'სერიოზულად? 🥺',
  'კიდევ იფიქრე',
  'დაი მაგას...',
  'შენ თვითონ გინდა ❤️',
  'კარგი, სერიოზულად?',
  'ვერ დამიჭერ!',
  'ისევ სცადე 😏',
  'არა!',
  'თითქმის დამიჭირე!',
]

const DODGE_THRESHOLD = 110
const PADDING = 12

interface DodgingButtonProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  onDodge: () => void
}

export default function DodgingButton({ containerRef, onDodge }: DodgingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dodgeCount, setDodgeCount] = useState(0)
  const [isAbsolute, setIsAbsolute] = useState(false)
  const rafId = useRef(0)

  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const springX = useSpring(motionX, { stiffness: 400, damping: 30 })
  const springY = useSpring(motionY, { stiffness: 400, damping: 30 })

  const dodge = useCallback(
    (cursorX: number, cursorY: number) => {
      const container = containerRef.current
      const button = buttonRef.current
      if (!container || !button) return

      const cRect = container.getBoundingClientRect()
      const bRect = button.getBoundingClientRect()

      const btnCenterX = bRect.left + bRect.width / 2
      const btnCenterY = bRect.top + bRect.height / 2

      const dx = btnCenterX - cursorX
      const dy = btnCenterY - cursorY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > DODGE_THRESHOLD || dist === 0) return

      if (!isAbsolute) {
        const offsetX = bRect.left - cRect.left
        const offsetY = bRect.top - cRect.top
        motionX.set(0)
        motionY.set(0)
        setIsAbsolute(true)
        button.style.position = 'absolute'
        button.style.left = `${offsetX}px`
        button.style.top = `${offsetY}px`
      }

      const currentLeft = parseFloat(button.style.left || '0')
      const currentTop = parseFloat(button.style.top || '0')

      const nx = dx / dist
      const ny = dy / dist
      const dodgeDist = 120 + Math.random() * 60

      let newLeft = currentLeft + nx * dodgeDist
      let newTop = currentTop + ny * dodgeDist

      const minX = PADDING
      const maxX = cRect.width - bRect.width - PADDING
      const minY = PADDING
      const maxY = cRect.height - bRect.height - PADDING

      newLeft = Math.max(minX, Math.min(maxX, newLeft))
      newTop = Math.max(minY, Math.min(maxY, newTop))

      const newBtnCenterX = cRect.left + newLeft + bRect.width / 2
      const newBtnCenterY = cRect.top + newTop + bRect.height / 2
      const newDist = Math.sqrt(
        (newBtnCenterX - cursorX) ** 2 + (newBtnCenterY - cursorY) ** 2
      )

      if (newDist < DODGE_THRESHOLD * 0.8) {
        const quadrants = [
          { x: minX + PADDING, y: minY + PADDING },
          { x: maxX - PADDING, y: minY + PADDING },
          { x: minX + PADDING, y: maxY - PADDING },
          { x: maxX - PADDING, y: maxY - PADDING },
        ]
        const cursorRelX = cursorX - cRect.left
        const cursorRelY = cursorY - cRect.top
        let bestQ = quadrants[0]
        let bestDist = 0
        for (const q of quadrants) {
          const d = Math.sqrt((q.x - cursorRelX) ** 2 + (q.y - cursorRelY) ** 2)
          if (d > bestDist) {
            bestDist = d
            bestQ = q
          }
        }
        newLeft = bestQ.x + Math.random() * 40 - 20
        newTop = bestQ.y + Math.random() * 40 - 20
        newLeft = Math.max(minX, Math.min(maxX, newLeft))
        newTop = Math.max(minY, Math.min(maxY, newTop))
      }

      button.style.left = `${newLeft}px`
      button.style.top = `${newTop}px`

      motionX.set(0)
      motionY.set(0)

      setDodgeCount(c => c + 1)
      onDodge()
    },
    [containerRef, isAbsolute, motionX, motionY, onDodge]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handlePointer = (e: PointerEvent) => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        dodge(e.clientX, e.clientY)
      })
    }

    container.addEventListener('pointermove', handlePointer)
    container.addEventListener('pointerdown', handlePointer)

    return () => {
      container.removeEventListener('pointermove', handlePointer)
      container.removeEventListener('pointerdown', handlePointer)
      cancelAnimationFrame(rafId.current)
    }
  }, [containerRef, dodge])

  const text = noTexts[Math.min(dodgeCount, noTexts.length - 1)]

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      className="px-6 py-3 bg-white border-2 border-gray-200 text-warm-gray rounded-button font-handwritten font-semibold text-lg cursor-pointer hover:border-gray-300 transition-colors whitespace-nowrap select-none"
      whileTap={{ scale: 0.95 }}
      aria-label={text}
    >
      {text}
    </motion.button>
  )
}
