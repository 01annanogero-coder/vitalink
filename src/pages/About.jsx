import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import TrustBadges from '../components/TrustBadges'
import { waGeneralLink } from '../config'

const timeline = [
  { year: '1958', title: 'NeoLife Founded', desc: 'NeoLife (then GNLD) is founded with a mission to help people achieve better health through science-backed whole-food nutrition.' },
  { year: '1970s', title: 'Pioneering Research', desc: 'NeoLife begins collaborating with leading scientists and institutions to validate products with clinical studies — a standard that continues today.' },
  { year: '1990s', title: 'Global Expansion', desc: 'NeoLife expands to over 50 countries, bringing science-backed nutrition to families worldwide, including across Africa.' },
  { year: '2020', title: 'Vitalink Established', desc: 'Vitalink becomes an official NeoLife distributor in Kenya, committed to making these products accessible to Kenyan families.' },
  { year: 'Today', title: 'Growing Community', desc: 'Vitalink serves customers across Kenya with personalised wellness guidance, fast delivery, and genuine NeoLife products.' },
]

const values = [
  { Icon: ShieldIcon, title: 'Integrity', desc: 'We only stock genuine NeoLife products and never make false health claims.' },
  { Icon: LeafIcon,   title: 'Whole-Food Science', desc: 'We believe in the superior bioavailability of whole-food nutrition over synthetic supplements.' },
  { Icon: HeartIcon,  title: 'Customer First', desc: 'Every order, question, and consultation is handled with care and personal attention.' },
  { Icon: GlobeIcon,  title: 'Kenyan Roots', desc: 'We are proudly Kenyan — we understand local lifestyles, diets, and health needs.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Vitalink — Kenya's trusted official NeoLife distributor. We bring 65+ years of science-backed nutrition to Kenyan families with personalised service and fast delivery."
        canonical="/about"
      />

      {/* Header */}
      <section className="bg-cream border-b border-gray-100 py-12">
        <div className="container-xl">
          <p className="eyebrow mb-2">Our Story</p>
          <h1 className="text-4xl font-serif font-bold text-forest-700 mb-3">About Vitalink</h1>
          <p className="text-muted max-w-xl">
            We are Kenya's trusted official NeoLife distributor — bringing science-backed wellness products to families with personalised service.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-3">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-forest-700 mb-5 leading-tight">
                Making Science-Backed Wellness Accessible to Every Kenyan
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Vitalink was founded on a simple belief: every Kenyan deserves access to products that are genuinely good for their health — backed by real science, made from real whole foods, and recommended by people who genuinely care.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                NeoLife has been at the frontier of nutritional science since 1958. As an official distributor, we carry the full range — supplements, weight management, personal care, and home care — and we are here to help you find what's right for you.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                We don't just sell products. We build relationships. We answer questions. We follow up. That's the Vitalink difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">Explore Products</Link>
                <a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Chat with Us
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
              <img
                src="/images/about-mission.jpg"
                alt="Vitalink team Kenya NeoLife wellness"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            subtitle="These principles guide every product recommendation, every conversation, and every order we fulfil."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-card p-6 shadow-card">
                <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-forest-700" />
                </div>
                <h3 className="font-serif font-semibold text-forest-700 text-lg mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NeoLife credibility */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] order-2 lg:order-1">
              <img
                src="/images/about-neolife.jpg"
                alt="NeoLife science and research"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow mb-3">About NeoLife</p>
              <h2 className="text-3xl font-serif font-semibold text-forest-700 mb-5 leading-tight">
                65+ Years of Nutritional Science
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Founded in 1958, NeoLife has spent over six decades advancing the science of whole-food nutrition. Unlike brands that use synthetic isolates, NeoLife formulates every product with nutrients in their natural whole-food forms — the way nature intended.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: '65+', label: 'Years of Research' },
                  { val: '50+', label: 'Countries' },
                  { val: '100%', label: 'Whole-Food' },
                  { val: '1000+', label: 'Studies Cited' },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-cream rounded-xl p-4">
                    <p className="text-2xl font-bold font-serif text-forest-700">{val}</p>
                    <p className="text-muted text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Our Journey"
            title="From 1958 to Today"
            subtitle="A brief history of NeoLife's commitment to science and Vitalink's mission in Kenya."
          />
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-leaf/30" />
            <div className="space-y-10">
              {timeline.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest-700 text-white flex items-center justify-center text-xs font-bold z-10 self-start">
                    <span className="text-center leading-tight">{year.length > 4 ? '...' : year.slice(-2)}</span>
                  </div>
                  <div className="bg-white rounded-card p-5 shadow-card flex-1 -mt-1">
                    <p className="eyebrow mb-1">{year}</p>
                    <h3 className="font-serif font-semibold text-forest-700 mb-2">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <SectionHeader eyebrow="Why Trust Vitalink" title="What Sets Us Apart" />
          <TrustBadges />
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-forest-700 text-white">
        <div className="container-xl text-center">
          <p className="eyebrow text-leaf-light mb-3">Ready to Start?</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Let's Find the Right Products for You</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">Our team is available on WhatsApp to answer your questions and recommend products tailored to your needs.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-3.5 px-8">
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-forest-700">
              Send Us a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ShieldIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> }
function LeafIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15.566l-1.132-.67a2.25 2.25 0 00-2.274 0l-.159.094a2.25 2.25 0 01-2.797-.157l-.052-.05" /></svg> }
function HeartIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> }
function GlobeIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> }
function WhatsAppIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
