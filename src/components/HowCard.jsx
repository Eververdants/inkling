import { useReveal } from '../hooks/useReveal'

export function HowCard({ card, i }) {
  const Icon = card.icon
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal group relative h-full rounded-2xl border border-ink-100/8 bg-ink-900/40 p-8 transition-all duration-500 hover:border-amber-400/30 hover:bg-ink-900/70"
      style={{ transitionDelay: `${i * 0.08}s` }}>
      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/8 text-amber-400">
        <Icon size={20} strokeWidth={1.4} />
      </div>
      <h3 className="font-display text-[1.5rem] font-light tracking-[-0.015em] text-ink-50">{card.title}</h3>
      <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-400">{card.desc}</p>
      <div aria-hidden className="absolute right-6 top-6 font-mono text-[10.5px] tracking-[0.18em] text-ink-600">0{i + 1}</div>
    </div>
  )
}
