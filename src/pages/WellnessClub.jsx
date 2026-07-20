import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_CLUB_TEMPLATE, waGeneralLink } from '../config'

const perks = [
  { Icon: DiscountIcon, title: 'Member Discounts',     desc: 'Club members receive exclusive discounts and priority access to promotional pricing on selected products.' },
  { Icon: TipsIcon,     title: 'Wellness Tips & Guides', desc: 'Monthly curated wellness content — articles, tips, and NeoLife science directly to your inbox.' },
  { Icon: ConsultIcon,  title: 'Free Consultations',   desc: 'Free personalised wellness consultations to help you choose the right products for your goals.' },
  { Icon: AlertIcon,    title: 'Restock Alerts',       desc: 'Be the first to know when popular products restock or new products arrive in Kenya.' },
  { Icon: PriorityIcon, title: 'Priority WhatsApp',    desc: 'Club members get priority response on WhatsApp — your questions go to the front of the queue.' },
  { Icon: CommunityIcon,title: 'Community Access',     desc: 'Join our private WhatsApp community of health-focused Kenyans sharing tips, results, and motivation.' },
]

export default function WellnessClub() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', town: '', goals: '' })

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_CLUB_TEMPLATE, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', town: '', goals: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Join Wellness Club"
        description="Join Vitalink's Wellness Club and enjoy member discounts, free consultations, wellness tips, and priority WhatsApp support. Free to join — exclusive benefits await."
        canonical="/wellness-club"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-leaf-dark to-forest-700 text-white py-20">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <p className="eyebrow text-leaf-light mb-3">Exclusive Membership</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-5">
            Join the Vitalink Wellness Club
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Free membership. Exclusive benefits. A community of health-focused Kenyans committed to living better.
          </p>
          <a href="#join-form" className="btn-primary bg-white text-forest-700 hover:bg-gray-100 py-4 px-8 text-base">
            Join for Free
          </a>
        </div>
      </section>

      {/* Perks */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <SectionHeader eyebrow="Member Benefits" title="What You Get as a Club Member" subtitle="Free to join. Real benefits. No commitments." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-cream rounded-card p-6 flex gap-4">
                <div className="w-11 h-11 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-forest-700 mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial strip */}
      <section className="section-pad bg-cream">
        <div className="container-xl max-w-2xl mx-auto text-center">
          <QuoteIcon className="w-10 h-10 text-leaf mx-auto mb-4 opacity-50" />
          <p className="text-navy text-xl font-serif leading-relaxed mb-6">
            "The free consultation alone was worth joining. Within 10 minutes, I had a clear plan for which products to start with — and the results have been incredible."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-white font-bold text-sm">FM</div>
            <div className="text-left">
              <p className="font-semibold text-navy text-sm">Faith M.</p>
              <p className="text-muted text-xs">Wellness Club Member, Nakuru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="join-form" className="section-pad bg-white">
        <div className="container-xl max-w-xl mx-auto">
          <SectionHeader eyebrow="Free Membership" title="Join the Wellness Club" subtitle="Complete this form and we'll add you to the club within 24 hours." />

          {status === 'success' ? (
            <div className="text-center bg-cream rounded-2xl p-12">
              <div className="w-16 h-16 rounded-full bg-mint mx-auto mb-4 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-forest-700" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Welcome to the Club!</h3>
              <p className="text-muted text-sm mb-6">You'll receive a welcome message from us shortly. Check your email and WhatsApp.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline py-2 text-sm">Register Another</button>
            </div>
          ) : (
            <div className="bg-cream rounded-2xl p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">Full Name *</label>
                  <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="input-field" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Email *</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">WhatsApp *</label>
                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">Town / City *</label>
                  <input name="town" type="text" required value={formData.town} onChange={handleChange} placeholder="e.g. Nairobi, Mombasa" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5">Your Wellness Goals (Optional)</label>
                  <textarea name="goals" rows={3} value={formData.goals} onChange={handleChange} placeholder="e.g. Lose weight, boost energy, better sleep…" className="input-field resize-none" />
                </div>
                {status === 'error' && (
                  <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">Something went wrong. Please try again or contact us on WhatsApp.</p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Joining…' : 'Join the Wellness Club — Free'}
                </button>
                <p className="text-xs text-muted text-center">Free to join. No spam. Unsubscribe anytime.</p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function QuoteIcon({ className }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg> }
function DiscountIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> }
function TipsIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> }
function ConsultIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg> }
function AlertIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg> }
function PriorityIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" /></svg> }
function CommunityIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> }
