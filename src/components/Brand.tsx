export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? 'compact' : ''}`} aria-label="PayPal"><span className="brand-icon"><i>P</i><b>P</b></span>{!compact && <span><strong>Pay</strong><em>Pal</em></span>}</span>
}
