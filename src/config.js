// ─────────────────────────────────────────────
// VITALINK CONFIGURATION
// Update this file only — never hardcode values elsewhere
// ─────────────────────────────────────────────

// WhatsApp (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = "254143276663";

// EmailJS — fill these after setting up your EmailJS account
export const EMAILJS_PUBLIC_KEY        = "YOUR_PUBLIC_KEY";
export const EMAILJS_SERVICE_ID        = "YOUR_SERVICE_ID";
export const EMAILJS_ORDER_TEMPLATE    = "YOUR_ORDER_TEMPLATE_ID"; // Cart checkout order notification — see /email/order-notification.html
export const EMAILJS_CONTACT_TEMPLATE  = "YOUR_CONTACT_TEMPLATE_ID";
export const EMAILJS_DISTRIBUTOR_TEMPLATE = "YOUR_DISTRIBUTOR_TEMPLATE_ID";
export const EMAILJS_CLUB_TEMPLATE     = "YOUR_CLUB_TEMPLATE_ID";

// Site info
export const SITE_URL = "https://vitalink.fyi";
export const SITE_NAME = "Vitalink";
export const DISTRIBUTOR_EMAIL = "vitalink@example.com"; // update with real email

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
