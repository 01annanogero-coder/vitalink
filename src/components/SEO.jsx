import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME } from '../config'

export default function SEO({
  title,
  description,
  canonical,
  image = '/images/og-image.jpg',
  type = 'website',
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME} — NeoLife Kenya` : `${SITE_NAME} — NeoLife Kenya | Health & Wellness`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}
