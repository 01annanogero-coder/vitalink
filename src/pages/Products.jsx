import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const categories = [
  { value: 'all',              label: 'All Products' },
  { value: 'supplements',      label: 'Supplements'       },
  { value: 'weight-management',label: 'Weight Management' },
  { value: 'personal-care',    label: 'Personal Care'     },
  { value: 'home-care',        label: 'Home Care'         },
  { value: 'starter-kits',     label: 'Starter Kits'      },
]

const sortOptions = [
  { value: 'default',   label: 'Default'           },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc',label: 'Price: High to Low' },
  { value: 'name-asc',  label: 'Name: A–Z'         },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch]   = useState('')
  const [sort, setSort]       = useState('default')

  const activeCat = searchParams.get('cat') || 'all'

  const setCategory = (cat) => {
    setSearchParams(cat === 'all' ? {} : { cat })
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCat !== 'all') {
      list = list.filter(p => p.category === activeCat)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => (a.srp ?? Infinity) - (b.srp ?? Infinity))
      case 'price-desc':
        return list.sort((a, b) => (b.srp ?? -Infinity) - (a.srp ?? -Infinity))
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  }, [activeCat, search, sort])

  return (
    <>
      <SEO
        title="All Products"
        description="Browse all 90+ NeoLife Kenya products — supplements, weight management shakes, personal care, and home care. Order via WhatsApp with Kenya-wide delivery."
        canonical="/products"
      />

      {/* Page header */}
      <section className="bg-cream border-b border-gray-100 py-12">
        <div className="container-xl">
          <p className="eyebrow mb-2">NeoLife Kenya</p>
          <h1 className="text-4xl font-serif font-bold text-forest-700 mb-3">Our Products</h1>
          <p className="text-muted max-w-xl">
            Browse our full catalogue of science-backed NeoLife products. Click any product for full details and order via WhatsApp.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── SIDEBAR FILTERS ── */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="text-sm font-semibold text-navy mb-2 block">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      type="search"
                      placeholder="Name, code…"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="input-field pr-9"
                    />
                    <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-sm font-semibold text-navy mb-3">Category</p>
                  <ul className="space-y-1">
                    {categories.map(({ value, label }) => (
                      <li key={value}>
                        <button
                          onClick={() => setCategory(value)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            activeCat === value
                              ? 'bg-mint text-forest-700 font-semibold'
                              : 'text-navy hover:bg-gray-50'
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sort */}
                <div>
                  <label htmlFor="sort" className="text-sm font-semibold text-navy mb-2 block">
                    Sort By
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="input-field"
                  >
                    {sortOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Reset */}
                {(activeCat !== 'all' || search || sort !== 'default') && (
                  <button
                    onClick={() => { setCategory('all'); setSearch(''); setSort('default') }}
                    className="text-sm text-muted underline hover:text-forest-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>

            {/* ── PRODUCT GRID ── */}
            <div className="flex-1 min-w-0">
              {/* Result count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted">
                  {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                  {activeCat !== 'all' && ` in ${categories.find(c => c.value === activeCat)?.label}`}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <SearchIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-navy font-semibold mb-2">No products found</p>
                  <p className="text-muted text-sm">Try a different search term or category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map(p => (
                    <ProductCard key={p.code} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}
