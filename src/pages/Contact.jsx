import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE,
  SOCIAL_LINKS,
  waGeneralLink,
} from '../config'

const contactMethods = [
  {
    Icon: WhatsAppIcon,
    title: 'WhatsApp',
    value: '+254 143 276 663',
    href: waGeneralLink(),
    desc: 'Fastest response — usually within minutes',
    external: true,
  },
  {
    Icon: MailIcon,
    title: 'Email',
    value: 'vitalink@example.com',
    href: 'mailto:vitalink@example.com',
    desc: 'We respond within 24 hours',
    external: false,
  },
  {
    Icon: MapIcon,
    title: 'Location',
    value: 'Nairobi, Kenya',
    href: null,
    desc: 'Serving customers Kenya-wide',
    external: false,
  },
]

export default function Contact() {
  const formRef  = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Vitalink Kenya — official NeoLife distributor. Order products, ask questions, or get personalised wellness advice. Available on WhatsApp and email."
        canonical="/contact"
      />

      {/* Header */}
      <section className="bg-cream border-b border-gray-100 py-12">
        <div className="container-xl">
          <p className="eyebrow mb-2">Get in Touch</p>
          <h1 className="text-4xl font-serif font-bold text-forest-700 mb-3">Contact Us</h1>
          <p className="text-muted max-w-xl">
            Questions about products, orders, or wellness advice? We're here to help. WhatsApp is the fastest way to reach us.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Left — contact methods + info */}
            <div>
              <h2 className="text-2xl font-serif font-semibold text-forest-700 mb-6">How to Reach Us</h2>

              <div className="space-y-5 mb-10">
                {contactMethods.map(({ Icon, title, value, href, desc, external }) => (
                  <div key={title} className="flex gap-4 p-5 bg-cream rounded-card">
                    <div className="w-11 h-11 rounded-full bg-mint flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">{title}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="text-forest-700 font-semibold hover:text-leaf-dark transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-forest-700 font-semibold">{value}</p>
                      )}
                      <p className="text-muted text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm font-semibold text-navy mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { href: SOCIAL_LINKS.facebook,  label: 'Facebook',  Icon: FacebookIcon  },
                    { href: SOCIAL_LINKS.instagram,  label: 'Instagram', Icon: InstagramIcon },
                    { href: SOCIAL_LINKS.twitter,    label: 'X',         Icon: TwitterIcon   },
                    { href: SOCIAL_LINKS.tiktok,     label: 'TikTok',    Icon: TikTokIcon    },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-navy hover:border-forest-700 hover:text-forest-700 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="bg-cream rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-semibold text-forest-700 mb-6">Send a Message</h2>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-mint mx-auto mb-4 flex items-center justify-center">
                    <CheckIcon className="w-8 h-8 text-forest-700" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Message Sent!</h3>
                  <p className="text-muted text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn-outline py-2 text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-navy mb-1.5">Full Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="Jane Muthoni"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-navy mb-1.5">Email Address *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="jane@example.com"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-navy mb-1.5">Phone / WhatsApp</label>
                      <input
                        id="phone" name="phone" type="tel"
                        value={formData.phone} onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-navy mb-1.5">Subject *</label>
                      <select
                        id="subject" name="subject" required
                        value={formData.subject} onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Enquiry">Product Enquiry</option>
                        <option value="Order Help">Order Help</option>
                        <option value="Wellness Consultation">Wellness Consultation</option>
                        <option value="Distributor Interest">Becoming a Distributor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-navy mb-1.5">Message *</label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={formData.message} onChange={handleChange}
                      placeholder="Tell us how we can help you…"
                      className="input-field resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">
                      Something went wrong. Please try again or contact us on WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>

                  <p className="text-xs text-muted text-center">
                    For an immediate response, use{' '}
                    <a href={waGeneralLink()} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">
                      WhatsApp
                    </a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Icons
function WhatsAppIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> }
function MailIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> }
function MapIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> }
function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function FacebookIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> }
function InstagramIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> }
function TwitterIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function TikTokIcon({ className }) { return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> }
