import { useReveal } from '../hooks/useReveal'

export function StageRow({ stage, i }) {
  const Icon = stage.icon
  const revealRef = useReveal()
  const isOffset = i % 2 === 1
  return (
    <article ref={revealRef} className="reveal group relative grid grid-cols-1 gap-6 border-t border-ink-100/8 py-12 md:grid-cols-12 md:gap-10 md:py-20">
      <div className={`md:col-span-3 ${isOffset ? 'md:order-3' : ''}`}>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[clamp(4.2rem,7vw,6.4rem)] font-light leading-[0.85] tracking-[-0.04em] text-amber-400/90 group-hover:text-amber-300 transition-colors">{stage.num}</span>
        </div>
      </div>
      <div className={`md:col-span-7 ${isOffset ? 'md:order-2' : ''}`}>
        <div className="flex items-center gap-2.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-500">
          <Icon size={13} strokeWidth={1.4} className="text-amber-400/70" />
          <span>{stage.sub}</span>
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-ink-50">{stage.title}</h3>
        <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-ink-300">{stage.desc}</p>
      </div>
      <div className={`md:col-span-2 ${isOffset ? 'md:order-1 md:text-right' : 'md:text-right'}`}>
        <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-500">Stage Goal</div>
        <div className="mt-3 font-mono text-[11.5px] leading-[1.7] text-amber-400/80">{stage.goal}</div>
      </div>
    </article>
  )
}
