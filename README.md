# Vitalink — NeoLife Kenya

**Official NeoLife Distributor Website**
Built with React 18 + Vite + Tailwind CSS. PWA-enabled. SEO-optimised. Deployed via Netlify.

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started (Development)](#4-getting-started-development)
5. [Configuration — Keys & Contacts](#5-configuration--keys--contacts)
6. [EmailJS Setup](#6-emailjs-setup)
7. [Image Requirements](#7-image-requirements)
8. [Adding or Updating Products](#8-adding-or-updating-products)
9. [SEO Notes](#9-seo-notes)
10. [PWA Notes](#10-pwa-notes)
11. [Deployment to Netlify](#11-deployment-to-netlify)
12. [Team / Collaborators](#12-team--collaborators)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Project Overview

Vitalink is a full-featured e-commerce website for an official NeoLife distributor in Kenya. Customers can either add products to a cart and check out directly (with shipping calculated automatically and an order-confirmation email sent to the team), or order individual products via WhatsApp. The site includes:

- **Home** — Hero, trust badges, health goals, featured products, testimonials, how-to-order
- **Products** — Full 90-product catalogue with search + category filter
- **Product Detail** — Individual product pages with full descriptions, benefits, gallery, quantity selector, add-to-cart, and WhatsApp order/question buttons
- **Cart & Checkout** — Persistent cart (localStorage), quantity controls, automatic shipping calculation (Nairobi vs. upcountry), order-confirmation email via EmailJS with a WhatsApp fallback if email fails
- **Health Goals** — Filter products by health goal (immunity, heart, weight, etc.)
- **About** — Brand story, NeoLife history, values, timeline
- **Contact** — Contact form (EmailJS) + WhatsApp + social links
- **Be a Distributor** — Opportunity page with FAQ + application form (EmailJS)
- **Wellness Club** — Membership signup form (EmailJS)

---

## 2. Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| @emailjs/browser | Contact / signup / order forms |
| react-helmet-async | Per-page SEO |
| vite-plugin-pwa | PWA + service worker |
| React Context + localStorage | Cart state and persistence (no backend) |

---

## 3. Project Structure

```
vitalink/
├── email/
│   ├── order-notification.html  ← Order confirmation email template (paste into EmailJS)
│   └── order-notification.mjml  ← MJML source for the above
├── public/
│   ├── images/
│   │   ├── products/          ← Product images (see Section 7)
│   │   ├── og-image.jpg       ← 1200×630 Open Graph image
│   │   ├── logo.svg           ← SVG logo
│   │   ├── placeholder.jpg    ← Fallback product image
│   │   ├── about-home.jpg     ← Homepage about section
│   │   ├── about-mission.jpg  ← About page mission section
│   │   ├── about-neolife.jpg  ← About page NeoLife section
│   │   ├── category-supplements.jpg
│   │   ├── category-weight.jpg
│   │   ├── category-personal.jpg
│   │   └── category-home.jpg
│   ├── icons/
│   │   ├── icon-192x192.png   ← PWA icon
│   │   ├── icon-512x512.png   ← PWA icon
│   │   ├── favicon-32x32.png
│   │   └── favicon-16x16.png
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Includes cart icon with live item-count badge
│   │   ├── Footer.jsx
│   │   ├── WhatsAppFAB.jsx
│   │   ├── ProductCard.jsx     ← Add to Cart + WhatsApp Order buttons
│   │   ├── SEO.jsx
│   │   ├── SectionHeader.jsx
│   │   └── TrustBadges.jsx
│   ├── context/
│   │   └── CartContext.jsx     ← Cart state, persisted to localStorage
│   ├── data/
│   │   └── products.js         ← All 90 products with prices
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── CartPage.jsx        ← Cart + checkout with shipping calculation
│   │   ├── HealthGoals.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── BeADistributor.jsx
│   │   ├── WellnessClub.jsx
│   │   └── NotFound.jsx
│   ├── config.js              ← All keys, WhatsApp number, social links
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── package.json
```

---

## 4. Getting Started (Development)

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/01annanogero-coder/vitalink.git
cd vitalink

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 5. Configuration — Keys & Contacts

**All configurable values live in one file: `src/config.js`**

```js
// WhatsApp number (no + or spaces)
export const WHATSAPP_NUMBER = "254143276663"

// EmailJS
export const EMAILJS_PUBLIC_KEY        = "YOUR_PUBLIC_KEY"
export const EMAILJS_SERVICE_ID        = "YOUR_SERVICE_ID"
export const EMAILJS_ORDER_TEMPLATE    = "YOUR_ORDER_TEMPLATE_ID"       // Cart checkout order notification
export const EMAILJS_CONTACT_TEMPLATE  = "YOUR_CONTACT_TEMPLATE_ID"
export const EMAILJS_DISTRIBUTOR_TEMPLATE = "YOUR_DISTRIBUTOR_TEMPLATE_ID"
export const EMAILJS_CLUB_TEMPLATE     = "YOUR_CLUB_TEMPLATE_ID"

// Site info
export const SITE_URL = "https://vitalink.fyi"
export const DISTRIBUTOR_EMAIL = "vitalink@example.com"
```

Never hardcode these values elsewhere in the codebase.

---

## 6. EmailJS Setup

Vitalink uses EmailJS for 4 flows:

| Flow | Template Variable | Template Source |
|---|---|---|
| Cart checkout order | `EMAILJS_ORDER_TEMPLATE` | `/email/order-notification.html` |
| Contact form | `EMAILJS_CONTACT_TEMPLATE` | Build your own in the EmailJS dashboard |
| Distributor application | `EMAILJS_DISTRIBUTOR_TEMPLATE` | Build your own in the EmailJS dashboard |
| Wellness Club signup | `EMAILJS_CLUB_TEMPLATE` | Build your own in the EmailJS dashboard |

### Steps
1. Go to [emailjs.com](https://www.emailjs.com) and create a free account
2. Add your email service (Gmail recommended)
3. Create 4 email templates. For the order template, paste the HTML from `/email/order-notification.html` directly into the EmailJS template editor — it expects these variables: `{{customer_name}}`, `{{customer_phone}}`, `{{customer_location}}`, `{{order_summary}}`, `{{order_total}}`, `{{shipping_method}}`. The other 3 templates can reference `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}` etc.
4. Copy your **Public Key**, **Service ID**, and each **Template ID**
5. Paste them into `src/config.js`

### Cart checkout flow
When a customer checks out from `/cart`, `CartPage.jsx` calculates shipping automatically:
- **Nairobi & surrounding estates** (Westlands, Karen, Kilimani, Lavington, Parklands, Kasarani, Embakasi, Langata, Ruaka, Kiambu, Rongai) → KES 250, motorbike rider, same-day/next-day
- **Everywhere else** → KES 450, bus parcel service, 24–48 hours

To adjust these areas or fees, edit the `NAIROBI_AREAS` array and `calculateShipping()` function at the top of `src/pages/CartPage.jsx`. If the EmailJS send fails, the customer sees a WhatsApp fallback link pre-filled with their order.

---

## 7. Image Requirements

### General Site Images
Place these directly in `/public/images/`:

| Filename | Size | Description |
|---|---|---|
| `og-image.jpg` | 1200 × 630 | Open Graph / social share image |
| `placeholder.jpg` | 600 × 600 | Fallback when product image fails |
| `about-home.jpg` | 800 × 600 | Homepage about section |
| `about-mission.jpg` | 800 × 600 | About page mission section |
| `about-neolife.jpg` | 800 × 600 | About page NeoLife section |
| `category-supplements.jpg` | 600 × 400 | Supplements category card |
| `category-weight.jpg` | 600 × 400 | Weight management category card |
| `category-personal.jpg` | 600 × 400 | Personal care category card |
| `category-home.jpg` | 600 × 400 | Home care category card |

### Product Images
Place all product images in `/public/images/products/`.
**Filename = product code + .jpg**

| Code | Product Name |
|---|---|
| `2318.jpg` | Aloe Vera Gel 100ml |
| `2313.jpg` | Body Luv 250ml |
| `2312.jpg` | Enriching Conditioner 250ml |
| `2311.jpg` | Mild Revitalizing Shampoo 250ml |
| `2315.jpg` | Nourishing Hand & Body Lotion 250ml |
| `2309.jpg` | Personal Care Concentrate 250ml |
| `2314.jpg` | Refreshing Bath & Shower Gel 250ml |
| `2310.jpg` | Rich Revitalizing Shampoo 250ml |
| `2340.jpg` | Balancing Tonic 100ml |
| `2332.jpg` | Cleansing Gel 150ml |
| `2333.jpg` | Cleansing Milk 150ml |
| `2334.jpg` | Hydrating Serum 30ml |
| `2341.jpg` | Insta-Lift Eye Gel 15ml |
| `2337.jpg` | Moisturizing Cream 75ml |
| `2339.jpg` | Rejuvenating Rich Cream 50ml |
| `2335.jpg` | Ultra Hydrating Serum 30ml |
| `2338.jpg` | Ultra Moisturizing Cream 75ml |
| `2934.jpg` | Nutriance Organic 3-Step (Normal to Dry) |
| `2935.jpg` | Nutriance Organic 3-Step (Combination to Oily) |
| `2411.jpg` | Care 1 Litre |
| `2412.jpg` | Care 5 Litre |
| `2034.jpg` | Carpet Glo 1 Litre |
| `2035.jpg` | Carpet Glo 5 Litre |
| `2051.jpg` | Fantastik 1 Litre |
| `2052.jpg` | Fantastik 5 Litre |
| `2141.jpg` | G1 Laundry Compound 2kg |
| `2422.jpg` | LC30 5 Litre |
| `2021.jpg` | LDC 1 Litre |
| `2022.jpg` | LDC 5 Litre |
| `2023.jpg` | LDC 25 Litre |
| `2071.jpg` | Lemon Glo 500ml |
| `2043.jpg` | Soft 1 Litre |
| `2012.jpg` | Super 10 5 Litre |
| `2013.jpg` | Super 10 25 Litre |
| `2016.jpg` | Super 10 Fragranced 1 Litre |
| `2017.jpg` | Super 10 Fragranced 5 Litre |
| `2019.jpg` | Super 10 Fragranced 25 Litre |
| `2742.jpg` | Super Gro 1 Litre |
| `2741.jpg` | Super Gro 5 Litre |
| `2061.jpg` | Wash 'n Wax 500ml |
| `2783.jpg` | Aloe Vera Plus 1 Litre |
| `2770.jpg` | Ami-Tone 90 Tablets |
| `2788.jpg` | Beta Guard 100 Tablets |
| `2515.jpg` | Botanical Balance 60 Tablets |
| `2564.jpg` | Carotenoid Complex 30 Capsules |
| `2565.jpg` | Carotenoid Complex 90 Capsules |
| `2722.jpg` | Chelated Cal-Mag 90 Tablets |
| `2787.jpg` | Chelated Zinc 100 Tablets |
| `2512.jpg` | Chewable All-C 90 Tablets |
| `2513.jpg` | CoQ10 60 Capsules |
| `2892.jpg` | Cruciferous Plus 60 Tablets |
| `2896.jpg` | Feminine Herbal Complex 60 Tablets |
| `2789.jpg` | Fibre Tablets 120 Tablets |
| `2790.jpg` | Flavonoid Complex 60 Tablets |
| `2577.jpg` | Formula IV 60 Capsules |
| `2576.jpg` | Formula IV 120 Capsules |
| `2556.jpg` | Formula IV Plus 30 Sachets |
| `2557.jpg` | Formula IV Plus 60 Sachets |
| `2585.jpg` | Full Motion 90 Tablets |
| `2457.jpg` | Garlic Allium Complex 60 Tablets |
| `2900.jpg` | Herbal Respiratory Formula 60 Tablets |
| `2901.jpg` | Herbal Rest & Relax 60 Tablets |
| `2509.jpg` | Lipotropic Adjunct 90 Tablets |
| `2895.jpg` | Liqui-Vite 240ml |
| `2723.jpg` | Magnesium Complex 60 Tablets |
| `2897.jpg` | Masculine Herbal Complex 60 Tablets |
| `2906.jpg` | Mind Enhancement Complex 60 Tablets |
| `2558.jpg` | Multi 30 Tablets |
| `2775.jpg` | Multi-Mineral + Alfalfa 60 Tablets |
| `2912.jpg` | NeoLifeShake Creamy Vanilla |
| `2913.jpg` | NeoLifeShake Berries n' Cream |
| `2914.jpg` | NeoLifeShake Rich Chocolate |
| `2915.jpg` | NeoLifeTea 15 Sticks |
| `2670.jpg` | Omega-3 60 Capsules |
| `2503.jpg` | PhytoDefence 30 Sachets |
| `2595.jpg` | Pro Vitality 30 Sachets |
| `2575.jpg` | Stage 6 100 Tablets |
| `2135.jpg` | Tre-en-en 60 Capsules |
| `2130.jpg` | Tre-en-en 120 Capsules |
| `2520.jpg` | Vegan D 90 Tablets |
| `2531.jpg` | Vitamin A & D 100 Capsules |
| `2541.jpg` | Vitamin B Co. 60 Tablets |
| `2551.jpg` | Vitamin C 100 Tablets |
| `2774.jpg` | Vitamin E 60 Capsules |
| `2894.jpg` | Vita Guard 120 Tablets |
| `2893.jpg` | Vita Squares 180 Tablets |
| `2561.jpg` | Wheat Germ Oil 60 Capsules |
| `1001.jpg` | Tre-en-en Starter Kit |
| `1003.jpg` | Pro Vitality Starter Kit |
| `1004.jpg` | Golden Starter Kit |

### PWA & Favicon Icons
Place in `/public/icons/`:
- `icon-192x192.png` — PWA app icon
- `icon-512x512.png` — PWA app icon (large)
- `favicon-32x32.png`
- `favicon-16x16.png`

Place at `/public/`:
- `favicon.ico`
- `apple-touch-icon.png` (180 × 180)

---

## 8. Adding or Updating Products

All product data is in `src/data/products.js`.

### Update a price
Find the product by code and change the `srp` value:
```js
{
  code: "2595",
  srp: 8270,   // ← change this
  ...
}
```

### Add a new product
Copy an existing product object and fill in all fields. Required fields:
- `code` — NeoLife product code
- `slug` — URL-safe identifier (e.g. `"pro-vitality-30-sachets"`)
- `name` — Full product name
- `category` — One of: `supplements`, `weight-management`, `personal-care`, `home-care`, `starter-kits`
- `healthGoals` — Array of goal slugs: `immunity`, `heart`, `weight`, `energy`, `skin`, `bones`, `brain`, `home`, `womens`, `mens`
- `srp` — Price in KES (or `null` for kits — kits are order-on-request only and don't get an Add to Cart button)
- `image` — Path: `/images/products/CODE.jpg`
- `shortDescription` — One sentence for cards
- `fullDescription` — Paragraph for product detail page

### Feature a product (show on homepage)
Set `featured: true`. Maximum 4 featured at a time.

---

## 9. SEO Notes

- Per-page `<title>` and `<meta description>` via `react-helmet-async`
- Each product page generates a `Product` JSON-LD structured data block
- Homepage has `Organization` JSON-LD
- `sitemap.xml` covers all static pages (update it if you add pages)
- `robots.txt` allows all crawlers
- Open Graph + Twitter Card tags on every page
- All product pages are crawlable (client-side routing, but Netlify serves SPA correctly via `netlify.toml` redirect)

### After adding new products
Add their URLs to `public/sitemap.xml`:
```xml
<url><loc>https://vitalink.fyi/products/your-slug</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

---

## 10. PWA Notes

The site is a PWA (Progressive Web App):
- Installable on Android and iOS home screens
- Offline caching via Workbox service worker
- App manifest configured in `vite.config.js`

**Required before launch:** Add the actual PWA icons listed in Section 7.

---

## 11. Deployment to Netlify

### Option A: Via GitHub (recommended for team)
1. Push the repo to GitHub: `github.com/01annanogero-coder/vitalink`
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select the repo and branch (`main`)
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

The `netlify.toml` file handles all redirect rules automatically — no manual setup needed.

### Option B: Manual drag-and-drop
1. Run `npm run build` locally
2. Drag the `dist/` folder into Netlify's drag-and-drop deploy interface

### Environment Variables
No environment variables are needed — all keys are in `src/config.js` (kept in source).

> **Note:** If you later want to secure EmailJS keys, move them to Netlify environment variables and read them via `import.meta.env.VITE_EMAILJS_PUBLIC_KEY`.

### Custom Domain
In Netlify → Domain settings, add `vitalink.fyi` and follow the DNS instructions.

---

## 12. Team / Collaborators

| Name | Role | Access |
|---|---|---|
| Annan Ogero | Lead Developer | Full access |
| Collaborator 2 | TBD | Add to GitHub repo |
| Collaborator 3 | TBD | Add to GitHub repo |
| Collaborator 4 | TBD | Add to GitHub repo |

### Git Workflow
- `main` — production branch (deploys to Netlify automatically)
- `dev` — development branch
- Feature branches: `feature/your-feature-name`
- Always open a Pull Request to merge into `main`

---

## 13. Troubleshooting

| Issue | Fix |
|---|---|
| WhatsApp order button sends wrong message | Check `waOrderLink()` in `src/config.js` |
| EmailJS form not sending | Verify keys in `src/config.js` and template IDs in EmailJS dashboard |
| Cart order email not arriving | Verify `EMAILJS_ORDER_TEMPLATE` in `src/config.js` matches the template built from `/email/order-notification.html`; customer sees a WhatsApp fallback link if the send fails |
| Cart is empty after refresh | Cart is stored in the browser's localStorage under the key `vitalink_cart` — clearing browser data will clear it |
| Product images not showing | Check filename = exact product code + `.jpg` in `/public/images/products/` |
| PWA not installing | Add the required icons in `/public/icons/` |
| 404 on page refresh | Confirm `netlify.toml` is present and the redirect rule is correct |
| Product not appearing on site | Check it's in `src/data/products.js` with correct `category` field |

---

*Last updated: July 2026 — Vitalink v1.1 (added cart & checkout)*
