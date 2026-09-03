import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const id = crypto.randomUUID().slice(0, 8)
    navigate(`/date/${id}`, { replace: true })
  }, [navigate])

  return null
}
