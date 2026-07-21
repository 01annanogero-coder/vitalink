import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import DistributorPayment from '../components/DistributorPayment'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_DISTRIBUTOR_TEMPLATE,
  waGeneralLink,
} from '../config'

const benefits = [
  { Icon: MoneyIcon,   title: 'Earn Income',           desc: 'Earn commissions on every sale. The more you sell, the more you earn — with no cap on your income.' },
  { Icon: ShieldIcon,  title: 'Trusted Products',       desc: 'Sell products that actually work — backed by 65+ years of science. Your customers will thank you.' },
  { Icon: PeopleIcon,  title: 'Community & Training',   desc: 'Join a network of motivated distributors and access ongoing training and business support.' },
  { Icon: FlexIcon,    title: 'Work Your Own Hours',    desc: 'Run your business on your own terms — full time, part time, or as a side income alongside your career.' },
  { Icon: GrowthIcon,  title: 'Build a Team',           desc: 'Recruit and train your own team of distributors and earn override commissions on their sales too.' },
  { Icon: GlobalIcon,  title: 'NeoLife\'s Global Brand', desc: 'Leverage NeoLife\'s 65-year reputation and global brand recognition to build customer trust quickly.' },
]

const steps = [
  { num: '01', title: 'Submit Your Interest', desc: 'Fill in the form below or message us on WhatsApp. We\'ll get back to you within 24 hours.' },
  { num: '02', title: 'Orientation Call',      desc: 'We\'ll walk you through the opportunity, products, and what it takes to succeed.' },
  { num: '03', title: 'Register as Distributor', desc: 'Complete your NeoLife registration and receive your starter kit and login credentials.' },
  { num: '04', title: 'Start Selling',          desc: 'Begin selling products to friends, family, and your network. We support you every step of the way.' },
]

const faqs = [
  { q: 'How much does it cost to join?', a: 'Joining NeoLife as a distributor requires purchasing a starter kit. Prices vary by kit — contact us for the current options and costs.' },
  { q: 'Do I need prior business experience?', a: 'No experience is needed. We provide training, product knowledge, and ongoing support. If you have passion and commitment, we can help you succeed.' },
  { q: 'How do I earn money?', a: 'You earn commissions on every product you sell. As you grow your team, you also earn override commissions on your team\'s sales. The NeoLife compensation plan rewards both personal sales and team building.' },
  { q: 'Can I do this part-time?', a: 'Absolutely. Many of our most successful distributors started part-time alongside their careers. You set your own hours and pace.' },
  { q: 'What support do I get?', a: 'You\'ll receive product training, sales and marketing guidance, access to our distributor community, and direct support from our team at Vitalink.' },
]

export default function BeADistributor() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', town: '', motivation: '' })

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_DISTRIBUTOR_TEMPLATE, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', town: '', motivation: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Become a Distributor"
        description="Become an official NeoLife distributor through Vitalink Kenya. Earn income selling science-backed wellness products. No prior experience required. Apply today."
        canonical="/be-a-distributor"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-900 to-forest-700 text-white py-20">
        <div className="container-xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-leaf-light mb-3">Business Opportunity</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-5">
              Build a Wellness Business You're Proud Of
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Become an official NeoLife distributor through Vitalink. Earn income helping people live healthier lives — with products that have stood the test of 65 years of science.
            </p>
            <a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp py-4 px-8 text-base">
              <WhatsAppIcon className="w-5 h-5" />
              Chat About the Opportunity
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: 'Free', label: 'Training Provided' },
              { val: '∞', label: 'Income Potential' },
              { val: 'Your', label: 'Own Hours' },
              { val: '65+', label: 'Years of NeoLife' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/10 border border-white/10 rounded-card p-5 text-center">
                <p className="text-3xl font-bold font-serif text-leaf">{val}</p>
                <p className="text-white/70 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <SectionHeader eyebrow="Why Distribute NeoLife" title="The Benefits of Joining Our Team" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-cream rounded-card p-6">
                <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-forest-700" />
                </div>
                <h3 className="font-serif font-semibold text-forest-700 mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad bg-cream">
        <div className="container-xl">
          <SectionHeader eyebrow="How It Works" title="Getting Started in 4 Simple Steps" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="bg-white rounded-card p-6 shadow-card relative">
                <span className="text-5xl font-bold font-serif text-mint absolute top-4 right-5 leading-none select-none">
                  {num}
                </span>
                <h3 className="font-serif font-semibold text-forest-700 text-lg mb-3 mt-4 relative z-10">{title}</h3>
                <p className="text-muted text-sm leading-relaxed relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Payment Plan */}
      <section id="pay-registration" className="section-pad bg-white">
        <div className="container-xl max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Ready to Join"
            title="Pay Your Registration Fee — At Your Own Pace"
            subtitle="Pay any amount toward your NeoLife starter kit via M-Pesa, whenever you can — no need to pay it all at once."
          />
          <DistributorPayment />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <SectionHeader eyebrow="Common Questions" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="border border-gray-200 rounded-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-cream transition-colors"
                >
                  <span className="font-medium text-navy text-sm">{q}</span>
                  <ChevronIcon className={`w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-muted text-sm leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="section-pad bg-cream">
        <div className="container-xl max-w-2xl mx-auto">
          <SectionHeader eyebrow="Apply Now" title="Register Your Interest" subtitle="Fill in this quick form and we'll be in touch within 24 hours." />

          {status === 'success' ? (
            <div className="text-center bg-white rounded-2xl p-12 shadow-card">
              <div className="w-16 h-16 rounded-full bg-mint mx-auto mb-4 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-forest-700" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Application Received!</h3>
              <p className="text-muted text-sm mb-6">We'll contact you within 24 hours to discuss the next steps.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline py-2 text-sm">Submit Another</button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dist-name" className="block text-xs font-semibold text-navy mb-1.5">Full Name *</label>
                    <input id="dist-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="dist-email" className="block text-xs font-semibold text-navy mb-1.5">Email *</label>
                    <input id="dist-email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dist-phone" className="block text-xs font-semibold text-navy mb-1.5">WhatsApp Number *</label>
                    <input id="dist-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="dist-town" className="block text-xs font-semibold text-navy mb-1.5">Town / City *</label>
                    <input id="dist-town" name="town" type="text" required value={formData.town} onChange={handleChange} placeholder="e.g. Nairobi, Kisumu" className="input-field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="dist-motivation" className="block text-xs font-semibold text-navy mb-1.5">Why do you want to join? (Optional)</label>
                  <textarea id="dist-motivation" name="motivation" rows={4} value={formData.motivation} onChange={handleChange} placeholder="Tell us a bit about yourself and your goals…" className="input-field resize-none" />
                </div>
                {status === 'error' && (
                  <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">Something went wrong. Please try again or message us on WhatsApp.</p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function WhatsAppIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function ChevronIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg> }
function MoneyIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg> }
function ShieldIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> }
function PeopleIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> }
function FlexIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function GrowthIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg> }
function GlobalIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> }
