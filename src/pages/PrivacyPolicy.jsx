import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { DISTRIBUTOR_EMAIL, WHATSAPP_NUMBER, NEOLIFE_OFFICIAL_URL } from '../config'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Vitalink collects, uses, and protects your personal information."
        canonical="/privacy-policy"
      />
      <section className="section-pad bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="eyebrow mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-forest-700 mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm mb-10">Last updated: July 2026</p>

          <div className="prose-vitalink space-y-8 text-navy leading-relaxed">

            <Section title="1. Who We Are">
              <p>
                Vitalink ("we", "us", "our") is an independent NeoLife distributor site operating in Kenya.
                We are not NeoLife International, and this website is not NeoLife's official site — you can
                always verify NeoLife directly at <a href={NEOLIFE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">our official NeoLife distributor profile</a>.
              </p>
              <p>
                This policy explains what personal information we collect through vitalink.fyi, why we collect
                it, how it's stored, and the rights you have over it under Kenya's Data Protection Act, 2019.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>What we collect depends on how you use the site:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Browsing the shop:</strong> No account or personal information is required to browse products. We don't track you individually while browsing.</li>
                <li><strong>Placing an order (Cart checkout):</strong> Full name, phone number, delivery location, and any order notes you provide — used only to fulfil and deliver your order.</li>
                <li><strong>Contact form:</strong> Your name, email, and message.</li>
                <li><strong>Wellness Club sign-up:</strong> Your name, phone number, and email.</li>
                <li><strong>Becoming a Distributor (registration payment plan):</strong> Full name, M-Pesa phone number, email address, and optionally your National ID number (only if you choose to provide it, to support your official NeoLife registration). This is the only part of the site that requires an account — a simple email sign-in link, with no password.</li>
                <li><strong>Payment data:</strong> When you pay via M-Pesa, the payment itself is processed directly by Safaricom. We receive and store the amount paid, the date, and Safaricom's M-Pesa receipt/confirmation code — we never see or store your M-Pesa PIN.</li>
              </ul>
            </Section>

            <Section title="3. Why We Collect It">
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To process and deliver product orders</li>
                <li>To respond to questions submitted via the Contact form or WhatsApp</li>
                <li>To track your registration payment progress if you're becoming a distributor, and to let you resume it later or on a different device</li>
                <li>To contact you about your distributor application (for example, once your registration fee is fully paid) or your order (for example, delivery updates)</li>
                <li>To meet our own record-keeping and accounting obligations</li>
              </ul>
              <p>We do not use your information for advertising or sell it to third parties.</p>
            </Section>

            <Section title="4. Who We Share It With">
              <p>We use a small number of trusted service providers to run the site. Each only receives the minimum data needed to do its job:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Safaricom (M-Pesa / Daraja API):</strong> processes your payment directly; we receive confirmation of successful/failed payments only.</li>
                <li><strong>Supabase:</strong> our database and backend provider, which securely stores distributor application and payment records.</li>
                <li><strong>EmailJS:</strong> used to send order confirmations, contact form replies, and Wellness Club/distributor notifications.</li>
                <li><strong>Netlify:</strong> hosts the website itself.</li>
              </ul>
              <p>
                We do not share your personal information with NeoLife or any other third party for marketing
                purposes. If you complete your distributor registration fee, your Sponsor (a real person on our
                team) will contact you directly using the details you provided, to complete your official NeoLife
                registration.
              </p>
            </Section>

            <Section title="5. How Long We Keep It">
              <p>
                We retain order, contact, and distributor application records for as long as reasonably necessary
                to fulfil the purpose they were collected for, and to meet any legal, accounting, or dispute-resolution
                requirements — typically no longer than necessary, and you may request earlier deletion (see Section 7).
              </p>
            </Section>

            <Section title="6. Security">
              <p>
                Distributor application and payment data is stored in a database that isn't directly accessible from
                the browser — all access goes through protected backend functions. We use industry-standard encrypted
                connections (HTTPS) throughout the site. No online system is 100% secure, but we take reasonable,
                proportionate steps to protect your information.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>Under Kenya's Data Protection Act, 2019, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Ask what personal information we hold about you</li>
                <li>Ask us to correct inaccurate information</li>
                <li>Ask us to delete your information, where we're not required to keep it for legal reasons</li>
                <li>Object to how your information is used</li>
                <li>Withdraw consent at any time (for example, you can stop a distributor payment plan at any time before completion)</li>
              </ul>
              <p>
                To exercise any of these rights, contact us using the details in Section 9. We'll respond within a
                reasonable time.
              </p>
            </Section>

            <Section title="8. Cookies & Local Storage">
              <p>
                We use your browser's local storage (not tracking cookies) to remember items in your cart and to
                keep you signed in during a distributor payment session. This data stays on your device and is not
                used to track you across other websites.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p>
                Questions about this policy, or requests relating to your personal information, can be sent to:
              </p>
              <ul className="list-none space-y-1">
                <li>Email: <a href={`mailto:${DISTRIBUTOR_EMAIL}`} className="text-forest-700 underline">{DISTRIBUTOR_EMAIL}</a></li>
                <li>WhatsApp: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">+{WHATSAPP_NUMBER}</a></li>
              </ul>
              <p className="text-sm text-muted mt-3">
                You can also raise a concern directly with NeoLife's official support if it relates to a product or
                your official distributor status, via <a href={NEOLIFE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">our official NeoLife distributor profile</a>.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this policy from time to time to reflect changes in how the site works or in the law.
                We'll update the "Last updated" date above when we do.
              </p>
            </Section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/terms" className="text-forest-700 underline text-sm">Read our Terms of Service →</Link>
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
