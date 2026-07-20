import { Link } from 'react-router-dom'
import { waOrderLink } from '../config'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { name, slug, srp, image, shortDescription, category, featured } = product
  const { addToCart } = useCart()

  return (
    <article className="card flex flex-col group">
      {/* Image */}
      <Link to={`/products/${slug}`} className="block relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
        />
        {featured && (
          <span className="absolute top-3 left-3 badge-gold">Featured</span>
        )}
        {srp === null && (
          <span className="absolute top-3 right-3 badge bg-forest-700 text-white">Kit</span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category pill */}
        <span className="eyebrow">
          {categoryLabel(category)}
        </span>

        {/* Name */}
        <h3 className="font-serif font-semibold text-forest-700 text-base leading-snug line-clamp-2">
          <Link to={`/products/${slug}`} className="hover:text-leaf-dark transition-colors">
            {name}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed line-clamp-2 flex-1">
          {shortDescription}
        </p>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          {srp !== null ? (
            <>
              <p className="text-xs text-muted uppercase tracking-wide">SRP</p>
              <p className="font-semibold text-forest-700 text-base">
                KES {srp.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted italic">Price on request</p>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/products/${slug}`}
            className="text-forest-700 border border-forest-700 rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-forest-700 hover:text-white transition-colors"
          >
            Details
          </Link>
          {srp !== null && (
            <>
              <button
                onClick={() => addToCart(product)}
                className="bg-forest-700 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-forest-600 transition-colors flex items-center gap-1"
              >
                <CartIcon className="w-3.5 h-3.5" />
                Add to Cart
              </button>
              <a
                href={waOrderLink(name, product.code, srp)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#1ebe5d] transition-colors flex items-center gap-1"
              >
                <WhatsAppIcon className="w-3 h-3" />
                Order
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function categoryLabel(cat) {
  const map = {
    'supplements':       'Supplements',
    'weight-management': 'Weight Management',
    'personal-care':     'Personal Care',
    'home-care':         'Home Care',
    'starter-kits':      'Starter Kit',
  }
  return map[cat] || cat
}

function CartIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.906-4.804 2.287-7.43a1.125 1.125 0 00-1.112-1.32H5.25M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
