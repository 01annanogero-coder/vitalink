import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SEO from '../components/SEO'
import ProductCard from '../components/ProductCard'
import { getBySlug, getRelated } from '../data/products'
import { waOrderLink, waQuestionLink } from '../config'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const product   = getBySlug(slug)

  if (!product) {
    return (
      <div className="container-xl py-24 text-center">
        <h1 className="text-2xl font-serif text-forest-700 mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    )
  }

  const related = getRelated(product)
  const {
    name, code, srp, image, gallery,
    shortDescription, fullDescription,
    benefits, whoItIsFor, howToUse,
    category, healthGoals, featured
  } = product

  const [activeImg, setActiveImg] = useState(image)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": `https://vitalink.fyi${image}`,
    "description": shortDescription,
    "sku": code,
    "brand": { "@type": "Brand", "name": "NeoLife" },
    "offers": srp ? {
      "@type": "Offer",
      "priceCurrency": "KES",
      "price": srp,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Vitalink Kenya" }
    } : undefined
  }

  return (
    <>
      <SEO
        title={name}
        description={`${shortDescription} — Order ${name} (Code: ${code}) from Vitalink, official NeoLife distributor in Kenya. ${srp ? `KES ${srp.toLocaleString()} SRP.` : ''}`}
        canonical={`/products/${slug}`}
        type="product"
        structuredData={structuredData}
      />

      {/* Breadcrumb */}
      <nav className="bg-cream border-b border-gray-100">
        <div className="container-xl py-3">
          <ol className="flex items-center gap-2 text-xs text-muted flex-wrap">
            <li><Link to="/" className="hover:text-forest-700 transition-colors">Home</Link></li>
            <li><ChevronIcon className="w-3 h-3" /></li>
            <li><Link to="/products" className="hover:text-forest-700 transition-colors">Products</Link></li>
            <li><ChevronIcon className="w-3 h-3" /></li>
            <li className="text-forest-700 font-medium truncate max-w-xs">{name}</li>
          </ol>
        </div>
      </nav>

      {/* Main product section */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Images */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="rounded-2xl bg-gray-50 overflow-hidden aspect-square border border-gray-100">
                <img
                  src={activeImg}
                  alt={name}
                  className="w-full h-full object-contain p-6"
                  onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                />
              </div>
              {/* Thumbnails */}
              {gallery && gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(img)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImg === img ? 'border-forest-700' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Category + code */}
              <div className="flex items-center gap-3 mb-4">
                <span className="eyebrow">{categoryLabel(category)}</span>
                <span className="text-muted text-xs">Code: {code}</span>
                {featured && <span className="badge-gold">Featured</span>}
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-700 leading-tight mb-4">
                {name}
              </h1>

              <p className="text-muted leading-relaxed mb-6">{shortDescription}</p>

              {/* Price */}
              <div className="bg-cream rounded-xl p-5 mb-6">
                {srp !== null ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted mb-1">Suggested Retail Price (SRP)</p>
                    <p className="text-3xl font-bold text-forest-700">KES {srp.toLocaleString()}</p>
                    <p className="text-xs text-muted mt-1">Price inclusive of VAT. Order via WhatsApp for payment options.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-forest-700">Price on Request</p>
                    <p className="text-xs text-muted mt-1">Starter kit pricing varies. Contact us for details.</p>
                  </div>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              {srp !== null && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 text-navy hover:bg-gray-50 transition-colors" aria-label="Decrease quantity">−</button>
                    <span className="w-10 text-center font-medium text-sm">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 text-navy hover:bg-gray-50 transition-colors" aria-label="Increase quantity">+</button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1 justify-center py-3"
                  >
                    <CartIcon className="w-4 h-4" />
                    {added ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {srp !== null && (
                  <a
                    href={waOrderLink(name, code, srp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp py-3.5 flex-1 justify-center"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Order on WhatsApp
                  </a>
                )}
                <a
                  href={waQuestionLink(name, code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline py-3.5 flex-1 justify-center"
                >
                  Ask a Question
                </a>
              </div>

              {/* Health goals */}
              {healthGoals.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Health Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {healthGoals.map(g => (
                      <Link
                        key={g}
                        to={`/health-goals?goal=${g}`}
                        className="badge-green hover:bg-leaf hover:text-white transition-colors"
                      >
                        {goalLabel(g)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Who it's for */}
              {whoItIsFor && (
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Who It's For</p>
                  <p className="text-navy text-sm leading-relaxed">{whoItIsFor}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs: Description / Benefits / How To Use */}
          <div className="mt-16">
            <ProductTabs product={product} />
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-serif font-semibold text-forest-700 mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map(p => <ProductCard key={p.code} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ProductTabs({ product }) {
  const [tab, setTab] = useState('description')
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'benefits',    label: 'Benefits'    },
    { id: 'usage',       label: 'How To Use'  },
  ]

  return (
    <div>
      {/* Tab nav */}
      <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors -mb-px ${
              tab === id
                ? 'border-forest-700 text-forest-700'
                : 'border-transparent text-muted hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        {tab === 'description' && (
          <p className="text-muted leading-relaxed">{product.fullDescription}</p>
        )}

        {tab === 'benefits' && product.benefits && (
          <ul className="space-y-3">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                <span className="text-navy text-sm">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'usage' && product.howToUse && (
          <div className="bg-mint/40 rounded-xl p-6">
            <p className="text-xs font-semibold text-forest-700 uppercase tracking-wider mb-3">Recommended Use</p>
            <p className="text-navy leading-relaxed">{product.howToUse}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helpers
function categoryLabel(cat) {
  const m = { 'supplements':'Supplements','weight-management':'Weight Management','personal-care':'Personal Care','home-care':'Home Care','starter-kits':'Starter Kit' }
  return m[cat] || cat
}
function goalLabel(g) {
  const m = { immunity:'Immune Support',heart:'Heart Health',weight:'Weight Management',energy:'Energy',skin:'Skin',bones:'Bones & Joints',brain:'Brain & Focus',home:'Home',womens:"Women's Health",mens:"Men's Health" }
  return m[g] || g
}

function ChevronIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg> }
function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function CartIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.906-4.804 2.287-7.43a1.125 1.125 0 00-1.112-1.32H5.25M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg> }
function WhatsAppIcon({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
}
