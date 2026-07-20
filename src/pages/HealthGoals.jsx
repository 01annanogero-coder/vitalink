import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'
import { getByGoal } from '../data/products'

const goals = [
  { slug: 'immunity', label: 'Immune Support',    desc: 'Strengthen your body\'s natural defence systems with targeted immune support.', Icon: ShieldIcon, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { slug: 'heart',    label: 'Heart Health',       desc: 'Support cardiovascular function, healthy blood pressure, and circulation.', Icon: HeartIcon, color: 'bg-red-50 text-red-700 border-red-200' },
  { slug: 'weight',   label: 'Weight Management',  desc: 'Achieve and maintain a healthy weight with science-backed support.', Icon: ScaleIcon, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { slug: 'energy',   label: 'Energy & Vitality',  desc: 'Fuel your body at the cellular level for sustained energy and vitality.', Icon: BoltIcon, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { slug: 'skin',     label: 'Skin & Beauty',      desc: 'Nourish your skin from the inside out and protect with Nutriance products.', Icon: SparkleIcon, color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { slug: 'bones',    label: 'Bones & Joints',     desc: 'Build strong bones and maintain flexible, pain-free joints.', Icon: BoneIcon, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { slug: 'brain',    label: 'Brain & Focus',      desc: 'Sharpen memory, focus, and mental clarity with targeted brain nutrition.', Icon: BrainIcon, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { slug: 'home',     label: 'Home & Family',      desc: 'Keep your home clean and safe with biodegradable Golden Home Care.', Icon: HomeIcon, color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { slug: 'womens',   label: "Women's Health",     desc: 'Targeted support for women\'s hormonal balance and wellbeing.', Icon: FemIcon, color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' },
  { slug: 'mens',     label: "Men's Health",       desc: 'Support men\'s vitality, hormonal health, and physical performance.', Icon: MenIcon, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
]

export default function HealthGoals() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeGoal = searchParams.get('goal') || ''

  const matchingProducts = useMemo(() => {
    if (!activeGoal) return []
    return getByGoal(activeGoal)
  }, [activeGoal])

  const activeGoalData = goals.find(g => g.slug === activeGoal)

  return (
    <>
      <SEO
        title="Shop by Health Goal"
        description="Find the right NeoLife products for your health goals — immune support, heart health, weight management, energy, skin, bones, brain health, and more."
        canonical="/health-goals"
      />

      {/* Header */}
      <section className="bg-cream border-b border-gray-100 py-12">
        <div className="container-xl">
          <p className="eyebrow mb-2">Personalised Wellness</p>
          <h1 className="text-4xl font-serif font-bold text-forest-700 mb-3">Shop by Health Goal</h1>
          <p className="text-muted max-w-xl">
            Choose a health goal below to find the NeoLife products that best support your specific wellness needs.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-xl">

          {/* Goal cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
            {goals.map(({ slug, label, Icon, color }) => (
              <button
                key={slug}
                onClick={() => setSearchParams(activeGoal === slug ? {} : { goal: slug })}
                className={`flex flex-col items-center gap-3 p-4 rounded-card border-2 transition-all text-center ${
                  activeGoal === slug
                    ? 'border-forest-700 bg-mint shadow-card'
                    : 'border-transparent bg-cream hover:border-gray-200 hover:shadow-card'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center border ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-navy leading-tight">{label}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          {!activeGoal && (
            <div className="text-center py-12 bg-cream rounded-2xl">
              <p className="text-muted">Select a health goal above to see matching products.</p>
            </div>
          )}

          {activeGoal && matchingProducts.length > 0 && (
            <div>
              {activeGoalData && (
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-semibold text-forest-700 mb-2">
                    {activeGoalData.label}
                  </h2>
                  <p className="text-muted">{activeGoalData.desc}</p>
                  <p className="text-sm text-muted mt-1">
                    {matchingProducts.length} product{matchingProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {matchingProducts.map(p => <ProductCard key={p.code} product={p} />)}
              </div>
            </div>
          )}

          {activeGoal && matchingProducts.length === 0 && (
            <div className="text-center py-12 bg-cream rounded-2xl">
              <p className="text-muted">No products found for this goal. <Link to="/products" className="text-forest-700 underline">Browse all products.</Link></p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function ShieldIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> }
function HeartIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> }
function ScaleIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" /></svg> }
function BoltIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> }
function SparkleIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg> }
function BoneIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> }
function BrainIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg> }
function HomeIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg> }
function FemIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v7.5m0 0H9.75m2.25 0h2.25M12 14.25a6 6 0 100-12 6 6 0 000 12z" /></svg> }
function MenIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6l-9 9m-3 3a6 6 0 11-8.485-8.485A6 6 0 019 18z" /></svg> }
