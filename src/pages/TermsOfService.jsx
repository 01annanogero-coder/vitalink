import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { DISTRIBUTOR_EMAIL, WHATSAPP_NUMBER, NEOLIFE_OFFICIAL_URL } from '../config'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="The terms that apply when you use Vitalink, order products, or start a distributor registration payment plan."
        canonical="/terms"
      />
      <section className="section-pad bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-700 mb-3">Terms of Service</h1>
          <p className="text-muted text-sm mb-10">Last updated: July 2026</p>

          <div className="prose-vitalink space-y-8 text-navy leading-relaxed">

            <Section title="1. About Vitalink">
              <p>
                Vitalink is an independent NeoLife distributor operating in Kenya. We are not NeoLife International
                and this is not NeoLife's official website. You can always verify NeoLife directly at{' '}
                <a href={NEOLIFE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">our official NeoLife distributor profile</a>.
                By using this site, you agree to these Terms and our{' '}
                <Link to="/privacy-policy" className="text-forest-700 underline">Privacy Policy</Link>.
              </p>
            </Section>

            <Section title="2. Browsing & Ordering Products">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Prices are shown in Kenyan Shillings (KES) and may change without notice.</li>
                <li>Placing an order through the cart or WhatsApp is a request to buy — we'll contact you (call or WhatsApp) to confirm your order before dispatch.</li>
                <li>Delivery timing and fees depend on your location, as shown at checkout, and may vary based on courier availability.</li>
                <li>Payment for products is due on delivery (cash or M-Pesa) unless otherwise agreed.</li>
                <li>Product images are for illustration; actual packaging may vary slightly by batch.</li>
              </ul>
            </Section>

            <Section title="3. Distributor Registration Payment Plan">
              <p>
                Vitalink offers a way to pay your NeoLife distributor registration fee in installments, at your own
                pace, instead of all at once. The following terms apply specifically to this feature:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>The fee is fixed and exact.</strong> The registration target is the amount NeoLife itself
                  charges for registration — currently KES 17,880 — with no markup added by Vitalink. This amount is
                  clearly shown before you pay and may change if NeoLife's own fee changes.
                </li>
                <li>
                  <strong>M-Pesa processing fee.</strong> Each payment includes a small additional charge — Safaricom's
                  own fee for collecting the payment via M-Pesa, not a fee we impose. This is shown to you, itemized,
                  before every payment.
                </li>
                <li>
                  <strong>You control the pace.</strong> There's no deadline to complete your payments, and no
                  penalty for pausing. You may stop the payment plan at any time before it's complete.
                </li>
                <li>
                  <strong>What happens once your target is reached.</strong> Once your full contribution (KES 17,880)
                  has been collected, our team reviews and manually forwards the funds to NeoLife to complete your
                  official registration, and your Sponsor will contact you to arrange your Starter Kit. This is a
                  manual step on our side, done deliberately rather than automatically, as an extra safeguard for
                  your funds.
                </li>
                <li>
                  <strong>Refunds and abandoned payments.</strong> Partial payments that have already been made
                  toward your registration remain credited to your application indefinitely — you can return at any
                  time (using your application code or by signing in with the email you registered) to continue and
                  complete it. If you decide not to proceed at all and would like a refund of amounts already paid
                  toward (but not yet forwarded to NeoLife for) your registration, contact us using the details in
                  Section 7 and we'll review your request. Refunds are not available once your full contribution has
                  already been forwarded to NeoLife, since at that point the funds are no longer held by us.
                </li>
                <li>
                  <strong>Becoming an official distributor.</strong> Completing this payment plan pays your
                  registration fee — it does not by itself make you an official NeoLife distributor. Official
                  registration is completed by NeoLife once we forward your payment, and you'll be contacted
                  directly as part of that process.
                </li>
              </ul>
            </Section>

            <Section title="4. Account & Sign-In">
              <p>
                Browsing and shopping never require an account. Starting a distributor payment plan does — we'll
                send a secure sign-in link to the email you provide (no password to remember). Keep access to that
                email address secure, since it's how you resume your application and how we'll reach you about it.
              </p>
            </Section>

            <Section title="5. Accuracy of Information You Provide">
              <p>
                You're responsible for providing accurate contact details (name, phone number, email, and, if
                provided, National ID). We rely on this information to deliver orders, process payments, and
                complete your NeoLife registration correctly — delays or errors caused by inaccurate information
                provided to us are not our responsibility.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                We aim to provide accurate product information and a reliable payment experience, but we don't
                guarantee the site will always be uninterrupted or error-free. To the extent permitted by Kenyan
                law, Vitalink is not liable for indirect or consequential losses arising from use of the site. This
                does not limit any liability that cannot legally be excluded.
              </p>
            </Section>

            <Section title="7. Reporting Issues or Concerns">
              <p>
                If something on the site seems wrong, unclear, or you have any concern about a payment or your
                application, please tell us right away:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: <a href={`mailto:${DISTRIBUTOR_EMAIL}`} className="text-forest-700 underline">{DISTRIBUTOR_EMAIL}</a></li>
                <li>WhatsApp: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">+{WHATSAPP_NUMBER}</a></li>
              </ul>
              <p className="text-sm text-muted mt-3">
                Concerns about NeoLife products or your official distributor status specifically can also be raised
                with NeoLife directly via <a href={NEOLIFE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">our official NeoLife distributor profile</a>.
              </p>
            </Section>

            <Section title="8. Governing Law">
              <p>These Terms are governed by the laws of Kenya.</p>
            </Section>

            <Section title="9. Changes to These Terms">
              <p>
                We may update these Terms from time to time. Continued use of the site after changes are posted
                means you accept the updated Terms.
              </p>
            </Section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/privacy-policy" className="text-forest-700 underline text-sm">Read our Privacy Policy →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-serif font-semibold text-forest-700 mb-3">{title}</h2>
      <div className="space-y-3 text-[15px]">{children}</div>
    </div>
  )
}
