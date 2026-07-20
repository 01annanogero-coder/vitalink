import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'
import { useCart } from '../context/CartContext'
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_ORDER_TEMPLATE,
  WHATSAPP_NUMBER,
} from '../config'

// Shipping logic — Nairobi + surrounding estates get rider delivery, everywhere else uses bus parcel
const NAIROBI_AREAS = ['nairobi', 'westlands', 'karen', 'kilimani', 'lavington', 'parklands', 'kasarani', 'embakasi', 'langata', 'ruaka', 'kiambu', 'rongai']

const calculateShipping = (location) => {
  const isNairobi = NAIROBI_AREAS.some(a => location.toLowerCase().includes(a))
  return isNairobi
    ? { fee: 250, method: 'Motorbike rider — same-day / next-day' }
    : { fee: 450, method: 'Bus parcel service — 24–48 hours' }
}

export default function CartPage() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart()

  const [form, setForm] = useState({ name: '', phone: '', location: '', notes: '' })
  const [shipping, setShipping] = useState(null)
  const [step, setStep] = useState('cart') // 'cart' | 'success'
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleLocationBlur = () => {
    if (form.location.trim()) setShipping(calculateShipping(form.location))
  }

  const orderTotal = total + (shipping?.fee || 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.location) {
      setError('Please fill in all required fields.')
      return
    }
    if (!shipping) {
      setError('Please enter your delivery location so we can calculate shipping.')
      return
    }
    setError('')
    setSubmitting(true)

    const orderLines = items
      .map(i => `• ${i.name} x${i.qty} = KES ${(i.price * i.qty).toLocaleString()}`)
      .join('\n')

    const orderSummary = `
Customer: ${form.name}
Phone: ${form.phone}
Location: ${form.location}
Notes: ${form.notes || 'None'}

ORDER ITEMS:
${orderLines}

Subtotal:  KES ${total.toLocaleString()}
Shipping:  KES ${shipping.fee} (${shipping.method})
TOTAL:     KES ${orderTotal.toLocaleString()}

Date: ${new Date().toLocaleString('en-KE')}
    `.trim()

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ORDER_TEMPLATE,
        {
          customer_name: form.name,
          customer_phone: form.phone,
          customer_location: form.location,
          order_summary: orderSummary,
          order_total: `KES ${orderTotal.toLocaleString()}`,
          shipping_method: shipping.method,
        },
        EMAILJS_PUBLIC_KEY
      )
      clearCart()
      setStep('success')
    } catch (err) {
      setError('Failed to send your order by email. You can also order directly via WhatsApp below.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const waFallbackLink = () => {
    const orderLines = items.map(i => `${i.name} x${i.qty}`).join(', ')
    const text = encodeURIComponent(
      `Hi! I'd like to order:\n\n${orderLines}\n\nTotal: KES ${orderTotal.toLocaleString()}\n\nName: ${form.name}\nPhone: ${form.phone}\nLocation: ${form.location}`
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }

  // Empty cart
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="section-pad text-center">
        <div className="container-xl max-w-md">
          <span className="text-5xl block mb-4">🛒</span>
          <h1 className="text-2xl font-serif font-bold text-forest-700 mb-3">Your cart is empty</h1>
          <p className="text-muted text-sm mb-8">Browse our products and add items to your cart to get started.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    )
  }

  // Success screen
  if (step === 'success') {
    return (
      <div className="section-pad text-center bg-cream">
        <div className="container-xl max-w-lg">
          <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center mx-auto mb-5">
            <CheckIcon className="w-8 h-8 text-forest-700" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest-700 mb-4">Order received!</h1>
          <p className="text-muted leading-relaxed mb-8">
            Thank you, <strong className="text-navy">{form.name}</strong>. We will reach you on{' '}
            <strong className="text-navy">{form.phone}</strong> to confirm your order and arrange delivery.
          </p>
          <div className="bg-white rounded-card p-5 mb-8 text-left border border-gray-200">
            <p className="font-medium text-navy text-sm mb-2">Delivery info</p>
            <p className="text-sm text-muted">📍 {form.location}</p>
            <p className="text-sm text-muted mt-1">🚚 {shipping?.method}</p>
          </div>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO title="Your Cart" description="Review your Vitalink cart and check out." canonical="/cart" />
      <section className="section-pad bg-cream">
        <div className="container-xl grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Left: Items + Form */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-forest-700 mb-7">Your Cart</h1>

            {/* Cart items */}
            <div className="bg-white rounded-card shadow-card mb-7 overflow-hidden divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.code} className="flex items-center gap-4 p-5">
                  <div className="w-16 h-16 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-navy text-sm truncate">{item.name}</p>
                    <p className="text-muted text-xs mt-0.5">KES {item.price.toLocaleString()} each</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.code, item.qty - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-navy transition-colors"
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="w-6 text-center font-medium text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.code, item.qty + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-navy transition-colors"
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <p className="w-24 text-right font-semibold text-forest-700 text-sm flex-shrink-0">
                    KES {(item.price * item.qty).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.code)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                    aria-label="Remove item"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout form */}
            <div className="bg-white rounded-card shadow-card p-7">
              <h2 className="text-xl font-serif font-semibold text-forest-700 mb-6">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cart-name" className="block text-xs font-semibold text-navy mb-1.5">Full Name *</label>
                    <input id="cart-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name" className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="cart-phone" className="block text-xs font-semibold text-navy mb-1.5">Phone Number *</label>
                    <input id="cart-phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="07XX XXX XXX" className="input-field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cart-location" className="block text-xs font-semibold text-navy mb-1.5">Delivery Location (Town / Estate) *</label>
                  <input id="cart-location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    onBlur={handleLocationBlur}
                    placeholder="e.g. Westlands, Nairobi or Nakuru" className="input-field" />
                  {shipping && (
                    <p className="mt-2 text-xs text-leaf-dark font-medium">
                      ✓ {shipping.method} — KES {shipping.fee}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cart-notes" className="block text-xs font-semibold text-navy mb-1.5">Order Notes (Optional)</label>
                  <textarea id="cart-notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Any specific instructions for your order…" rows={3}
                    className="input-field resize-none" />
                </div>

                {error && (
                  <div>
                    <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>
                    <a href={waFallbackLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center mt-3 py-3">
                      Order via WhatsApp instead
                    </a>
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Placing order…' : `Place Order — KES ${orderTotal.toLocaleString()}`}
                </button>

                <p className="text-xs text-muted text-center">
                  We will call or WhatsApp you to confirm your order before dispatch.
                </p>
              </form>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="bg-white rounded-card shadow-card p-6 lg:sticky lg:top-24">
            <h3 className="text-lg font-serif font-semibold text-forest-700 mb-5">Order Summary</h3>
            <div className="space-y-2.5 mb-4">
              {items.map(item => (
                <div key={item.code} className="flex justify-between text-sm text-navy">
                  <span className="truncate pr-3">{item.name} ×{item.qty}</span>
                  <span className="font-medium flex-shrink-0">KES {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Shipping</span>
                <span>{shipping ? `KES ${shipping.fee}` : 'Enter location'}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span className="text-navy">Total</span>
                <span className="text-forest-700">KES {orderTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-5 bg-mint/40 rounded-lg p-3.5">
              <p className="text-xs font-semibold text-forest-700 mb-1">Payment on delivery</p>
              <p className="text-xs text-muted">Pay cash or M-Pesa when your order arrives.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CheckIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
function XIcon({ className }) { return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> }
