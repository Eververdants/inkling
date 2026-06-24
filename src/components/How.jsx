import { HowCard } from './HowCard'

export function How({ t }) {
  return (
    <section id="how" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:mb-20">
          <div className="md:col-span-3">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-amber-400/80">{t.howLabel}</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink-50">{t.howTitle}</h2>
            <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.75] text-ink-300">{t.howDesc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {t.how.map((c, i) => (
            <HowCard key={i} card={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
