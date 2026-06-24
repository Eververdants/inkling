import { useReveal } from '../hooks/useReveal'

export function Stats({ t }) {
  const revealRef = useReveal()
  return (
    <section className="relative py-24 md:py-32">
      <div className="hairline-x" />
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-ink-100/8 bg-ink-100/8 md:grid-cols-4 rounded-sm">
          {t.stats.map((s, i) => (
            <div key={i} ref={revealRef} className="reveal bg-ink-950 px-6 py-10 md:px-10 md:py-14" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="font-display text-[clamp(3.2rem,5.4vw,4.6rem)] font-light leading-none tracking-[-0.04em] text-amber-400">{s.n}</div>
              <div className="mt-3 text-[12.5px] font-mono uppercase tracking-[0.16em] text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hairline-x" />
    </section>
  )
}
