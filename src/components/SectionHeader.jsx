export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignClass = {
    center: 'text-center mx-auto',
    left:   'text-left',
  }[align]

  return (
    <div className={`max-w-2xl mb-12 ${alignClass} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-forest-700 text-balance mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
