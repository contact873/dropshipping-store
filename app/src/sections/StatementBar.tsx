import { ChevronDown } from 'lucide-react'

export default function StatementBar() {
  return (
    <section
      className="w-full py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-2"
      style={{ backgroundColor: 'var(--bg-light)' }}
    >
      <p className="section-label" style={{ color: 'var(--text-tertiary)' }}>
        Free express shipping on orders over $150
      </p>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1 font-body text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>
          United States <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-1 font-body text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--text-tertiary)' }}>
          EN <ChevronDown size={14} />
        </button>
      </div>
    </section>
  )
}
