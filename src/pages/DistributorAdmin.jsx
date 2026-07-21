import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { DISTRIBUTOR_FUNCTIONS_URL } from '../config'

const SECRET_STORAGE_KEY = 'vitalink_admin_secret'

export default function DistributorAdmin() {
  const [secret, setSecret] = useState(() => sessionStorage.getItem(SECRET_STORAGE_KEY) || '')
  const [secretInput, setSecretInput] = useState('')
  const [leads, setLeads] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchLeads = async (secretToUse) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${DISTRIBUTOR_FUNCTIONS_URL}/admin-leads`, {
        headers: { 'x-admin-secret': secretToUse },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unauthorized')
      setLeads(data.leads)
      sessionStorage.setItem(SECRET_STORAGE_KEY, secretToUse)
      setSecret(secretToUse)
    } catch (err) {
      setError(err.message)
      sessionStorage.removeItem(SECRET_STORAGE_KEY)
      setSecret('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (secret) fetchLeads(secret)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUnlock = (e) => {
    e.preventDefault()
    if (secretInput.trim()) fetchLeads(secretInput.trim())
  }

  if (!secret) {
    return (
      <div className="section-pad bg-cream min-h-[70vh] flex items-center">
        <div className="container-xl max-w-sm mx-auto bg-white rounded-2xl shadow-card p-8">
          <h1 className="text-xl font-serif font-semibold text-forest-700 mb-1">Admin Access</h1>
          <p className="text-muted text-sm mb-6">Enter your admin dashboard secret to view distributor applications.</p>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={secretInput}
              onChange={e => setSecretInput(e.target.value)}
              placeholder="Admin secret"
              className="input-field"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
              {loading ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const pending = leads?.filter(l => l.disbursed_status === 'AWAITING_ADMIN_PAYOUT') || []
  const inProgress = leads?.filter(l => l.disbursed_status === 'IN_PROGRESS') || []
  const completed = leads?.filter(l => l.disbursed_status === 'COMPLETED') || []

  return (
    <>
      <SEO title="Admin — Distributor Applications" description="Internal admin dashboard." canonical="/admin/distributors" />
      <div className="section-pad bg-cream min-h-[70vh]">
        <div className="container-xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-bold text-forest-700">Distributor Applications</h1>
            <button onClick={() => fetchLeads(secret)} className="btn-outline py-2 text-sm">
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3 mb-6">{error}</p>}

          {pending.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-forest-700 uppercase tracking-wide mb-3">
                🔔 Awaiting Payout to NeoLife ({pending.length})
              </h2>
              <LeadTable leads={pending} highlight />
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
              In Progress ({inProgress.length})
            </h2>
            <LeadTable leads={inProgress} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">
              Completed ({completed.length})
            </h2>
            <LeadTable leads={completed} />
          </div>
        </div>
      </div>
    </>
  )
}

function LeadTable({ leads, highlight }) {
  if (!leads || leads.length === 0) {
    return <p className="text-muted text-sm bg-white rounded-card p-5">None yet.</p>
  }
  return (
    <div className={`bg-white rounded-card shadow-card overflow-x-auto ${highlight ? 'ring-2 ring-leaf' : ''}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted text-xs uppercase tracking-wide border-b border-gray-100">
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Applied</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {leads.map(lead => (
            <tr key={lead.application_code}>
              <td className="px-4 py-3 font-mono text-xs text-forest-700">{lead.application_code}</td>
              <td className="px-4 py-3 font-medium text-navy">{lead.full_name}</td>
              <td className="px-4 py-3 text-navy">{lead.phone}</td>
              <td className="px-4 py-3">
                KES {Number(lead.total_collected).toLocaleString()} / {Number(lead.total_required_goal).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-muted text-xs">{new Date(lead.created_at).toLocaleDateString('en-KE')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
