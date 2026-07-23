// ─────────────────────────────────────────────
// VITALINK CONFIGURATION
// Update this file only — never hardcode values elsewhere
// ─────────────────────────────────────────────

// WhatsApp (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = "254143276663";

// EmailJS — public key & service ID are shared across your whole EmailJS account (from the old project's order flow).
// Contact/Distributor/Club templates weren't wired to EmailJS in the old project (WhatsApp-only), so those stay placeholders until you create templates for them.
export const EMAILJS_PUBLIC_KEY        = "gMPjngKnm0diVJ8iV";
export const EMAILJS_SERVICE_ID        = "service_ltgs5dv";
export const EMAILJS_ORDER_TEMPLATE    = "template_t4x2459"; // Cart checkout order notification — see /email/order-notification.html
export const EMAILJS_CONTACT_TEMPLATE  = "YOUR_CONTACT_TEMPLATE_ID";
export const EMAILJS_DISTRIBUTOR_TEMPLATE = "YOUR_DISTRIBUTOR_TEMPLATE_ID";
export const EMAILJS_CLUB_TEMPLATE     = "YOUR_CLUB_TEMPLATE_ID";

// Site info
export const SITE_URL = "https://vitalink.fyi";
export const SITE_NAME = "Vitalink";
export const DISTRIBUTOR_EMAIL = "kenyavitalink@gmail.com";

// Distributor registration payment backend (Supabase)
export const SUPABASE_URL = "https://hpypxmmcfxyhfvadxyxl.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_sIwGRS3kPnji8j66t2hXnQ_5Jd_rbjW";
export const DISTRIBUTOR_FUNCTIONS_URL = "https://hpypxmmcfxyhfvadxyxl.supabase.co/functions/v1";
export const NEOLIFE_OFFICIAL_URL = "https://shopneolife.com/annanogero";

// Social media links
export const SOCIAL_LINKS = {
  facebook:  "https://www.facebook.com/profile.php?id=61589456675954",
  twitter:   "https://x.com/ogero9258",
  instagram: "https://www.instagram.com/zygoatfans",
  tiktok:    "https://www.tiktok.com/@annanogero",
  whatsapp:  `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I'd%20like%20to%20find%20out%20more%20about%20NeoLife%20products.`,
};

// WhatsApp message builders
export const waOrderLink = (name, code, srp) => {
  const text = encodeURIComponent(
    `Hi! I'd like to order:\n\nProduct: ${name}\nCode: ${code}\nPrice: KES ${srp.toLocaleString()}\n\nPlease let me know how to pay and arrange delivery. Thank you!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export const waQuestionLink = (name, code) => {
  const text = encodeURIComponent(
    `Hi, I'd like more information about ${name} (Code: ${code}).`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export const waGeneralLink = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to find out more about NeoLife products.")}`;
