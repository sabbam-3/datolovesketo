import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-blush to-cream flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-6xl mb-4">💔</p>
        <h1 className="font-handwritten text-3xl font-bold text-warm-gray mb-2">
          Page not found
        </h1>
        <p className="text-warm-gray/70 mb-6">
          This link doesn't lead anywhere...
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-rose-deep text-white rounded-button font-handwritten font-semibold text-lg hover:bg-rose-dark transition-colors"
        >
          Start fresh
        </Link>
      </div>
    </div>
  )
}
