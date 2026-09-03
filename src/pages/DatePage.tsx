import { useParams } from 'react-router'
import DateExperience from '../components/DateExperience'

export default function DatePage() {
  const { id } = useParams()

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blush to-cream flex items-center justify-center p-4">
      <DateExperience key={id} />
    </div>
  )
}
