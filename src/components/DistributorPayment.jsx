import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DISTRIBUTOR_FUNCTIONS_URL, NEOLIFE_OFFICIAL_URL, WHATSAPP_NUMBER } from '../config'

const PENDING_CLAIM_KEY = 'vitalink_distributor_pending_claim'

async function callFn(name, body, jwt) {
  const res = await fetch(`${DISTRIBUTOR_FUNCTIONS_URL}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
  return data
}

function calcFee(goalAmount, rate, cap) {
  if (!goalAmount || goalAmount <= 0) return 0
  return Math.min(Math.ceil(goalAmount * rate), cap)
}

export default function DistributorPayment() {
  // stage: 'apply' | 'check-email' | 'pay' | 'polling' | 'success'
  const [stage, setStage] = useState('apply')
  const [mode, setMode] = useState('new') // 'new' | 'signin' (toggles the initial card)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [application, setApplication] = useState(null)
  const [applyForm, setApplyForm] = useState({ full_name: '', phone: '', email: '', national_id: '' })
  const [signinEmail, setSigninEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [checkoutRequestId, setCheckoutRequestId] = useState(null)
  const pollRef = useRef(null)

  // On mount: check if we returned from a magic-link click (Supabase auto-detects the session
  // from the URL hash). If so, either claim a brand-new application or look up an existing one.
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const pendingCode = localStorage.getItem(PENDING_CLAIM_KEY)
      setLoading(true)
      try {
        if (pendingCode) {
          const data = await callFn('distributor-claim', { application_code: pendingCode }, session.access_token)
          localStorage.removeItem(PENDING_CLAIM_KEY)
          await refreshAfterAuth(session.access_token, data.application_code)
        } else {
          const data = await callFn('distributor-my-application', {}, session.access_token)
          setApplication(data)
          setStage(data.disbursed_status === 'IN_PROGRESS' ? 'pay' : 'success')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    init()
    return () => clearInterval(pollRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshAfterAuth = async (jwt, code) => {
    const data = await callFn('distributor-my-application', {}, jwt).catch(() => null)
    if (data) {
      setApplication(data)
      setStage(data.disbursed_status === 'IN_PROGRESS' ? 'pay' : 'success')
    } else {
      setApplication({ application_code: code })
      setStage('pay')
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    setError('')
    if (!applyForm.full_name.trim() || applyForm.full_name.trim().length < 3) {
      setError('Please enter your full name.')
      return
    }
    if (!/^(0|\+?254)(7|1)\d{8}$/.test(applyForm.phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid Kenyan phone number (e.g. 07XX XXX XXX).')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applyForm.email.trim())) {
      setError("Please enter a valid email — we'll send a secure link to save your progress.")
      return
    }
    setLoading(true)
    try {
      const data = await callFn('distributor-apply', applyForm)
      setApplication({ ...data, full_name: applyForm.full_name })
      localStorage.setItem(PENDING_CLAIM_KEY, data.application_code)

      const { error: otpErr } = await supabase.auth.signInWithOtp({
        email: applyForm.email.trim().toLowerCase(),
        options: { emailRedirectTo: window.location.href },
      })
      if (otpErr) throw new Error('Could not send the confirmation email. Please try again.')

      setStage('check-email')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignInRequest = async (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinEmail.trim())) {
      setError('Please enter the email you used when you applied.')
      return
    }
    setLoading(true)
    try {
      localStorage.removeItem(PENDING_CLAIM_KEY) // signing in, not claiming a new one
      const { error: otpErr } = await supabase.auth.signInWithOtp({
        email: signinEmail.trim().toLowerCase(),
        options: { emailRedirectTo: window.location.href },
      })
      if (otpErr) throw new Error('Could not send the sign-in email. Please try again.')
      setStage('check-email')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setError('')
    const amt = Math.floor(Number(amount))
    if (!amt || amt <= 0) {
      setError('Please enter a valid amount.')
      return
    }
    setLoading(true)
    try {
      const data = await callFn('distributor-pay', {
        application_code: application.application_code,
        goal_amount: amt,
      })
      setCheckoutRequestId(data.checkout_request_id)
      setStage('polling')
      startPolling(data.checkout_request_id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const startPolling = (checkoutId) => {
    let attempts = 0
    pollRef.current = setInterval(async () => {
      attempts += 1
      try {
        const data = await callFn('distributor-status', {
          application_code: application.application_code,
          checkout_request_id: checkoutId,
        })
        setApplication(data)
        if (data.latest_transaction_status === 'SUCCESS') {
          clearInterval(pollRef.current)
          setAmount('')
          setStage(data.disbursed_status === 'AWAITING_ADMIN_PAYOUT' ? 'success' : 'pay')
        } else if (data.latest_transaction_status === 'FAILED') {
          clearInterval(pollRef.current)
          setError('Payment was not completed (cancelled or timed out). You can try again.')
          setStage('pay')
        }
      } catch {
        // ignore transient errors, keep polling
      }
      if (attempts >= 30) {
        clearInterval(pollRef.current)
        setError('Still waiting on confirmation. If you completed the M-Pesa prompt, your balance will update shortly — refresh to check.')
        setStage('pay')
      }
    }, 3000)
  }

  const remaining = application ? Number(application.total_required_goal) - Number(application.total_collected) : 0
  const progressPct = application ? Math.min(100, (Number(application.total_collected) / Number(application.total_required_goal)) * 100) : 0
  const feeRate = application?.mpesa_fee_rate ?? 0.005
  const feeCap = application?.mpesa_fee_cap ?? 200
  const minPayment = application?.min_payment_amount ?? 500
  const enteredAmt = Math.floor(Number(amount)) || 0
  const previewFee = calcFee(enteredAmt, feeRate, feeCap)

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* ── Stage: Apply / Sign in ──────────────────────────── */}
        {stage === 'apply' && (
          <div className="p-8">
            <div className="flex gap-1 mb-6 bg-gray-50 rounded-lg p-1">
              <button onClick={() => setMode('new')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'new' ? 'bg-white shadow-sm text-forest-700' : 'text-muted'}`}>
                New Application
              </button>
              <button onClick={() => setMode('signin')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'signin' ? 'bg-white shadow-sm text-forest-700' : 'text-muted'}`}>
                I Already Applied
              </button>
            </div>

            {mode === 'new' ? (
              <>
                <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Start Your Registration</h3>
                <p className="text-muted text-sm mb-6">
                  Pay your NeoLife distributor registration fee (KES 17,880) in installments — any amount, any time, until you reach the total.
                </p>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label htmlFor="ap-name" className="block text-xs font-semibold text-navy mb-1.5">Full Name *</label>
                    <input id="ap-name" value={applyForm.full_name} onChange={e => setApplyForm(f => ({ ...f, full_name: e.target.value }))}
                      placeholder="Your full name" className="input-field" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ap-phone" className="block text-xs font-semibold text-navy mb-1.5">M-Pesa Phone Number *</label>
                      <input id="ap-phone" value={applyForm.phone} onChange={e => setApplyForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="07XX XXX XXX" className="input-field" />
                    </div>
                    <div>
                      <label htmlFor="ap-email" className="block text-xs font-semibold text-navy mb-1.5">Email *</label>
                      <input id="ap-email" type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ap-id" className="block text-xs font-semibold text-navy mb-1.5">National ID (Optional)</label>
                    <input id="ap-id" value={applyForm.national_id} onChange={e => setApplyForm(f => ({ ...f, national_id: e.target.value }))}
                      placeholder="For your official NeoLife registration" className="input-field" />
                  </div>
                  <p className="text-xs text-muted">
                    We'll email you a secure link (no password needed) so you can safely come back and continue paying from any device.
                  </p>
                  {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? 'Setting up…' : 'Start Payment Plan'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Continue Your Application</h3>
                <p className="text-muted text-sm mb-6">Enter the email you used when you applied — we'll send you a secure sign-in link.</p>
                <form onSubmit={handleSignInRequest} className="space-y-4">
                  <input type="email" value={signinEmail} onChange={e => setSigninEmail(e.target.value)}
                    placeholder="your@email.com" className="input-field" />
                  {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? 'Sending link…' : 'Send Me a Sign-In Link'}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* ── Stage: Check Email ──────────────────────────────── */}
        {stage === 'check-email' && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center mx-auto mb-5">
              <MailIcon className="w-8 h-8 text-forest-700" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Check Your Email</h3>
            <p className="text-muted text-sm leading-relaxed">
              We've sent you a secure link. Click it to confirm it's really you and continue to payment — no password needed.
            </p>
          </div>
        )}

        {/* ── Stage: Pay ──────────────────────────────────────── */}
        {stage === 'pay' && application && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-serif font-semibold text-forest-700">Your Payment Plan</h3>
              <span className="text-xs font-mono text-muted bg-gray-50 px-2 py-1 rounded">{application.application_code}</span>
            </div>
            <p className="text-muted text-sm mb-6">Pay any amount toward your registration fee. Come back any time to continue.</p>

            <div className="bg-cream rounded-xl p-5 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-navy font-medium">KES {Number(application.total_collected).toLocaleString()}</span>
                <span className="text-muted">of KES {Number(application.total_required_goal).toLocaleString()}</span>
              </div>
              <div className="h-2.5 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-leaf rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-xs text-muted mt-2.5">Remaining balance: <strong className="text-forest-700">KES {remaining.toLocaleString()}</strong></p>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label htmlFor="pay-amount" className="block text-xs font-semibold text-navy mb-1.5">Amount to Pay Now (KES)</label>
                <input id="pay-amount" type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder={`e.g. 1000 (min ${minPayment}, max ${remaining.toLocaleString()})`} className="input-field" />
              </div>

              {enteredAmt > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1.5">
                  <div className="flex justify-between text-navy">
                    <span>Toward your registration</span>
                    <span>KES {enteredAmt.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>M-Pesa processing fee (Safaricom's own charge, not ours)</span>
                    <span>KES {previewFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-forest-700 border-t border-gray-200 pt-1.5 mt-1.5">
                    <span>You'll be asked to confirm</span>
                    <span>KES {(enteredAmt + previewFee).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
              <button type="submit" disabled={loading} className="btn-whatsapp w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Sending request…' : 'Pay via M-Pesa'}
              </button>
              <p className="text-xs text-muted text-center">You'll get an M-Pesa prompt on your phone to enter your PIN.</p>
            </form>
          </div>
        )}

        {/* ── Stage: Polling ──────────────────────────────────── */}
        {stage === 'polling' && (
          <div className="p-10 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full border-4 border-mint border-t-forest-700 animate-spin" />
            <h3 className="text-lg font-serif font-semibold text-forest-700 mb-2">Check Your Phone</h3>
            <p className="text-muted text-sm">Enter your M-Pesa PIN on the prompt sent to your phone. This page will update automatically once payment is confirmed.</p>
          </div>
        )}

        {/* ── Stage: Success ──────────────────────────────────── */}
        {stage === 'success' && application && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center mx-auto mb-5">
              <CheckIcon className="w-8 h-8 text-forest-700" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-forest-700 mb-3">Registration Fee Complete!</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              You've paid the full KES {Number(application.total_required_goal).toLocaleString()}. Your Sponsor will contact you within 1–2 hours to complete your official NeoLife registration and arrange your Starter Kit.
            </p>
            <div className="bg-cream rounded-xl p-4 inline-block">
              <p className="text-xs text-muted">Application Code</p>
              <p className="font-mono font-semibold text-forest-700">{application.application_code}</p>
            </div>
          </div>
        )}
      </div>

      {/* Trust + support footer — shown on every stage */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3 text-xs">
        <a
          href={NEOLIFE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-white rounded-xl border border-gray-100 p-4 hover:border-forest-700 transition-colors text-center"
        >
          <p className="font-medium text-navy mb-0.5">Not sure this is legitimate?</p>
          <p className="text-forest-700 underline">Visit NeoLife's official website</p>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I have a question or issue about my distributor registration payment.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-white rounded-xl border border-gray-100 p-4 hover:border-forest-700 transition-colors text-center"
        >
          <p className="font-medium text-navy mb-0.5">Something wrong or unclear?</p>
          <p className="text-forest-700 underline">Report it to us on WhatsApp</p>
        </a>
      </div>
    </div>
  )
}

function CheckIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
}
function MailIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
}
