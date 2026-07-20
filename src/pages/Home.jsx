import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import ProductCard from '../components/ProductCard'
import { getFeatured } from '../data/products'
import { waGeneralLink, WHATSAPP_NUMBER } from '../config'

const featuredProducts = getFeatured()

const healthGoals = [
  { slug: 'immunity',  label: 'Immune Support',      Icon: ShieldIcon,   color: 'bg-emerald-50 text-emerald-700' },
  { slug: 'heart',     label: 'Heart Health',         Icon: HeartIcon,    color: 'bg-red-50 text-red-700'     },
  { slug: 'weight',    label: 'Weight Management',    Icon: ScaleIcon,    color: 'bg-amber-50 text-amber-700' },
  { slug: 'energy',    label: 'Energy & Vitality',    Icon: BoltIcon,     color: 'bg-yellow-50 text-yellow-700' },
  { slug: 'skin',      label: 'Skin & Beauty',        Icon: SparkleIcon,  color: 'bg-pink-50 text-pink-700'   },
  { slug: 'bones',     label: 'Bones & Joints',       Icon: BoneIcon,     color: 'bg-blue-50 text-blue-700'   },
  { slug: 'brain',     label: 'Brain & Focus',        Icon: BrainIcon,    color: 'bg-purple-50 text-purple-700' },
  { slug: 'home',      label: 'Home & Family',        Icon: HomeIcon,     color: 'bg-teal-50 text-teal-700'   },
]

const categories = [
  {
    slug:  'supplements',
    label: 'Supplements',
    desc:  'Science-backed vitamins, minerals, and antioxidants for total wellbeing.',
    Icon:  CapsuleIcon,
    image: '/images/category-supplements.jpg',
  },
  {
    slug:  'weight-management',
    label: 'Weight Management',
    desc:  'Meal replacements, fat metabolism support, and appetite control.',
    Icon:  ScaleIcon,
    image: '/images/category-weight.jpg',
  },
  {
    slug:  'personal-care',
    label: 'Personal Care',
    desc:  'Organic skincare, hair care, and body care from Nutriance.',
    Icon:  SparkleIcon,
    image: '/images/category-personal.jpg',
  },
  {
    slug:  'home-care',
    label: 'Home Care',
    desc:  'Biodegradable Golden Home Care products for a clean, safe home.',
    Icon:  HomeIcon,
    image: '/images/category-home.jpg',
  },
]

const testimonials = [
  {
    quote: "I've been using Pro Vitality for three months and my energy levels have never been better. I feel the difference every single day.",
    name: 'Grace M.',
    role: 'Teacher, Nairobi',
    initials: 'GM',
  },
  {
    quote: "The NeoLifeShake helped me lose 8kg in 10 weeks without feeling deprived. The chocolate flavour is genuinely delicious.",
    name: 'David K.',
    role: 'Engineer, Kisumu',
    initials: 'DK',
  },
  {
    quote: "Ordering via WhatsApp is so convenient. Delivery was fast and the products arrived exactly as described. Highly recommend.",
    name: 'Amina W.',
    role: 'Entrepreneur, Mombasa',
    initials: 'AW',
  },
]

const stats = [
  { value: '65+', label: 'Years of Research' },
  { value: '50+', label: 'Countries Worldwide' },
  { value: '90+',  label: 'Products Available' },
  { value: '100%', label: 'Whole-Food Formulas' },
]

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Vitalink — NeoLife Kenya",
    "description": "Official NeoLife distributor in Kenya. Shop science-backed health supplements, personal care, and home care products.",
    "url": "https://vitalink.fyi"
  }

  return (
    <>
      <SEO
        title={null}
        description="Vitalink is an official NeoLife distributor in Kenya. Shop science-backed health supplements, personal care, and home care products. Order via WhatsApp. Fast delivery across Kenya."
        canonical="/"
        structuredData={structuredData}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-forest-900 via-forest-700 to-forest-600 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full border-2 border-white" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-white translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-white" />
        </div>

        <div className="container-xl relative py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <span className="inline-block bg-leaf/20 text-leaf-light text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                Official NeoLife Distributor — Kenya
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
                Your Partner in
                <span className="text-leaf"> Health &amp;</span>
                <br />Wellness
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                Science-backed NeoLife products for immune health, weight management, skin care, and a cleaner home. Trusted by families across Kenya since 1958.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary py-3.5 px-7 text-base">
                  Shop All Products
                </Link>
                <a
                  href={waGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp py-3.5 px-7 text-base"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat with Us
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/10">
                  <p className="text-4xl font-serif font-bold text-leaf">{value}</p>
                  <p className="text-white/70 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ──────────────────────────────────────── */}
      <section className="section-pad-sm bg-cream">
        <div className="container-xl">
          <TrustBadges />
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src="/images/about-home.jpg"
                  alt="Vitalink Kenya NeoLife wellness consultation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Float badge */}
              <div className="absolute -bottom-6 -right-6 bg-forest-700 text-white rounded-card p-5 shadow-xl hidden md:block">
                <p className="text-3xl font-bold font-serif">65+</p>
                <p className="text-mint text-sm">Years of Science</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="eyebrow mb-3">Welcome to Vitalink</p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-forest-700 leading-tight mb-5">
                Bringing NeoLife's World-Class Nutrition to Kenya
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Vitalink is an official NeoLife distributor committed to making science-backed health and wellness products accessible across Kenya. We believe that real health comes from whole-food nutrition — not shortcuts.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Every product we carry is formulated using NeoLife's rigorous standards — peer-reviewed research, whole-food sourcing, and clinical validation. No artificial fillers. No compromises.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'All products backed by clinical research',
                  'Whole-food formulas — superior bioavailability',
                  'Personalised wellness consultation available',
                  'Convenient WhatsApp ordering and delivery',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-leaf mt-0.5 flex-shrink-0" />
                    <p className="text-navy text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HEALTH GOALS ──────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Shop by Health Goal"
            title="What Are You Looking to Improve?"
            subtitle="Find the right NeoLife products for your specific wellness needs."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {healthGoals.map(({ slug, label, Icon, color }) => (
              <Link
                key={slug}
                to={`/health-goals?goal=${slug}`}
                className={`flex flex-col items-center gap-3 p-5 rounded-card bg-white shadow-card hover:shadow-card-hover transition-shadow text-center group`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-navy">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <SectionHeader
              eyebrow="Top Picks"
              title="Featured Products"
              subtitle="Our most popular, science-backed wellness essentials."
              align="left"
              className="mb-0"
            />
            <Link to="/products" className="btn-ghost flex-shrink-0">
              View all products
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.code} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Product Categories"
            title="Everything You Need for a Healthier Life"
            subtitle="Four categories covering your nutrition, weight, personal care, and home needs."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(({ slug, label, desc, Icon, image }) => (
              <Link
                key={slug}
                to={`/products?cat=${slug}`}
                className="card group flex flex-col"
              >
                <div className="relative bg-gray-100 h-44 overflow-hidden">
                  <img
                    src={image}
                    alt={`${label} — NeoLife Kenya`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-forest-700/40 group-hover:bg-forest-700/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1">
                  <h3 className="font-serif font-semibold text-forest-700 text-lg mb-2">{label}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="px-5 pb-4">
                  <span className="btn-ghost text-sm">
                    Browse {label}
                    <ChevronRightIcon className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-forest-700 text-white">
        <div className="container-xl">
          <SectionHeader
            eyebrow="What Our Customers Say"
            title="Real Results, Real People"
            subtitle="Thousands of Kenyans trust Vitalink for their wellness journey."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, initials }) => (
              <div key={name} className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/10">
                <QuoteIcon className="w-8 h-8 text-leaf mb-4 opacity-60" />
                <p className="text-white/85 leading-relaxed mb-6 text-sm">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-leaf flex items-center justify-center text-forest-700 font-bold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/60 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Simple Ordering Process"
            title="Order in 3 Easy Steps"
            subtitle="No complicated checkout. Just find what you need and message us on WhatsApp."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse Our Products', desc: 'Explore our full catalogue by category or health goal. Every product page includes full details, benefits, and pricing.', Icon: SearchIcon },
              { step: '02', title: 'Click "Order on WhatsApp"', desc: 'Each product has a WhatsApp order button that pre-fills your message with the product details — no typing needed.', Icon: ChatIcon },
              { step: '03', title: 'Confirm & Receive Delivery', desc: 'We confirm availability, arrange payment, and organise delivery to your location across Kenya.', Icon: DeliveryIcon },
            ].map(({ step, title, desc, Icon }) => (
              <div key={step} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center">
                    <Icon className="w-6 h-6 text-forest-700" />
                  </div>
                </div>
                <div>
                  <span className="eyebrow">Step {step}</span>
                  <h3 className="font-serif font-semibold text-forest-700 text-lg mt-1 mb-2">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp py-4 px-8 text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Start Ordering Now
            </a>
          </div>
        </div>
      </section>

      {/* ── DISTRIBUTOR CTA ───────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <div className="rounded-2xl bg-gradient-to-r from-forest-700 to-forest-600 p-10 md:p-16 text-white text-center">
            <p className="eyebrow text-leaf-light mb-3">Earn While You Help Others</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Become a NeoLife Distributor
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Build your own wellness business backed by NeoLife's proven products and global support network. No experience required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/be-a-distributor" className="btn-primary bg-white text-forest-700 hover:bg-gray-100">
                Learn How to Join
              </Link>
              <Link to="/wellness-club" className="btn-outline border-white text-white hover:bg-white hover:text-forest-700">
                Join Wellness Club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Icons ────────────────────────────────────────────────────────
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
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
function CapsuleIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg> }
function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function ChevronRightIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg> }
function QuoteIcon({ className }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg> }
function SearchIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> }
function ChatIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg> }
function DeliveryIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg> }
