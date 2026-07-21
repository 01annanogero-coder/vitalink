import { useState, useEffect, useRef } from 'react'
import { DISTRIBUTOR_FUNCTIONS_URL } from '../config'

const STORAGE_KEY = 'vitalink_distributor_application'

async function callFn(name, body) {
  const res = await fetch(`${DISTRIBUTOR_FUNCTIONS_URL}/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
  return data
}

export default function DistributorPayment() {
  // stage: 'apply' | 'pay' | 'polling' | 'success'
  const [stage, setStage] = useState('apply')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [application, setApplication] = useState(null) // { application_code, full_name, net_target_amount, total_required_goal, total_collected }
  const [applyForm, setApplyForm] = useState({ full_name: '', phone: '', email: '', national_id: '' })
  const [amount, setAmount] = useState('')
  const [checkoutRequestId, setCheckoutRequestId] = useState(null)
  const [resumeCode, setResumeCode] = useState('')
  const pollRef = useRef(null)

  // Resume a saved application on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const code = JSON.parse(saved).application_code
      refreshStatus(code)
    }
    return () => clearInterval(pollRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshStatus = async (code) => {
    try {
      const data = await callFn('distributor-status', { application_code: code })
      setApplication(data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ application_code: code }))
      if (data.disbursed_status === 'AWAITING_ADMIN_PAYOUT' || data.disbursed_status === 'COMPLETED') {
        setStage('success')
      } else {
        setStage('pay')
      }
      return data
    } catch {
      // Saved code no longer valid — start fresh
      localStorage.removeItem(STORAGE_KEY)
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
    setLoading(true)
    try {
      const data = await callFn('distributor-apply', applyForm)
      setApplication({ ...data, full_name: applyForm.full_name })
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ application_code: data.application_code }))
      setStage('pay')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResume = async (e) => {
    e.preventDefault()
    setError('')
    if (!resumeCode.trim()) return
    setLoading(true)
    const data = await refreshStatus(resumeCode.trim().toUpperCase())
    if (!data) setError('Application code not found. Please check and try again.')
    setLoading(false)
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
        amount: amt,
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
      if (attempts >= 30) { // ~90s timeout
        clearInterval(pollRef.current)
        setError('Still waiting on confirmation. If you completed the M-Pesa prompt, your balance will update shortly — refresh to check.')
        setStage('pay')
      }
    }, 3000)
  }

  const remaining = application ? Number(application.total_required_goal) - Number(application.total_collected) : 0
  const progressPct = application ? Math.min(100, (Number(application.total_collected) / Number(application.total_required_goal)) * 100) : 0

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* ── Stage: Apply ────────────────────────────────────── */}
      {stage === 'apply' && (
        <div className="p-8">
          <h3 className="text-xl font-serif font-semibold text-forest-700 mb-2">Start Your Registration</h3>
          <p className="text-muted text-sm mb-6">
            Pay your NeoLife distributor registration fee in installments — any amount, any time, until you reach the total. No pressure, pay at your own pace.
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
                <label htmlFor="ap-email" className="block text-xs font-semibold text-navy mb-1.5">Email (Optional)</label>
                <input id="ap-email" type="email" value={applyForm.email} onChange={e => setApplyForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" className="input-field" />
              </div>
            </div>
            <div>
              <label htmlFor="ap-id" className="block text-xs font-semibold text-navy mb-1.5">National ID (Optional)</label>
              <input id="ap-id" value={applyForm.national_id} onChange={e => setApplyForm(f => ({ ...f, national_id: e.target.value }))}
                placeholder="For your official NeoLife registration" className="input-field" />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Setting up…' : 'Start Payment Plan'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-muted mb-2">Already started an application?</p>
            <form onSubmit={handleResume} className="flex gap-2">
              <input value={resumeCode} onChange={e => setResumeCode(e.target.value)} placeholder="e.g. VL-7F3K9"
                className="input-field flex-1 text-sm" />
              <button type="submit" disabled={loading} className="btn-outline px-4 text-sm whitespace-nowrap">Resume</button>
            </form>
          </div>
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

          {/* Progress bar */}
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
                placeholder={`e.g. 1000 (max ${remaining.toLocaleString()})`} className="input-field" />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
            <button type="submit" disabled={loading} className="btn-whatsapp w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Sending request…' : `Pay via M-Pesa`}
            </button>
            <p className="text-xs text-muted text-center">You'll get an M-Pesa prompt on your phone to enter your PIN.</p>
          </form>
        </div>
      )}

      {/* ── Stage: Polling (waiting for STK confirmation) ──── */}
      {stage === 'polling' && (
        <div className="p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full border-4 border-mint border-t-forest-700 animate-spin" />
          <h3 className="text-lg font-serif font-semibold text-forest-700 mb-2">Check Your Phone</h3>
          <p className="text-muted text-sm">Enter your M-Pesa PIN on the prompt sent to your phone. This page will update automatically once payment is confirmed.</p>
        </div>
      )}

      {/* ── Stage: Success (goal reached) ──────────────────── */}
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
  )
}

function CheckIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
}
