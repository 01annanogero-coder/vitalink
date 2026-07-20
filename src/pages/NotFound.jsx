import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="min-h-[70vh] flex items-center justify-center bg-cream">
        <div className="text-center px-4">
          <p className="text-8xl font-bold font-serif text-mint mb-4">404</p>
          <h1 className="text-3xl font-serif font-semibold text-forest-700 mb-3">Page Not Found</h1>
          <p className="text-muted mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/products" className="btn-outline">Browse Products</Link>
          </div>
        </div>
      </div>
    </>
  )
}
