import { ArrowUpRight, MoveRight, Terminal } from 'lucide-react'
import { Convergence } from './Convergence'

export function Hero({ t }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(212,165,116,0.18), rgba(212,165,116,0) 70%)' }} />
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10 lg:gap-20">
        <div className="md:col-span-7 lg:col-span-7">
          <div className="reveal visible mb-10 inline-flex items-center gap-2.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-amber-400/80">
            <span className="inline-block h-px w-7 bg-amber-400/60" />
            {t.hero.badge}
          </div>
          <h1 className="reveal visible font-display font-light leading-[0.95] tracking-[-0.035em] text-ink-50 text-[clamp(2.6rem,6.4vw,5.4rem)]">
            <span className="block">{t.hero.line1}</span>
            <span className="block italic text-amber-400">{t.hero.line2}</span>
            <span className="block">{t.hero.line3}</span>
            <span className="block">{t.hero.line4}</span>
            <span className="block italic text-amber-400">{t.hero.line5}</span>
            <span className="block">{t.hero.line6}</span>
          </h1>
          <p className="reveal visible mt-10 max-w-[42ch] text-[15.5px] leading-[1.75] text-ink-300">{t.hero.desc}</p>
          <div className="reveal visible mt-10">
            <div className="group inline-flex items-center gap-3 rounded-full border border-ink-100/12 bg-ink-900/60 px-2 py-1.5 font-mono text-[12.5px] text-ink-200 backdrop-blur-sm">
              <span className="flex items-center gap-1.5 px-2.5 py-1 text-amber-400">
                <Terminal size={12} strokeWidth={1.5} />
                <span>bash</span>
              </span>
              <code className="pr-1 text-ink-100">{t.hero.install.replace(/^\$ /, '')}</code>
              <span className="ml-1 mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400/70" />
            </div>
            <p className="mt-3 text-[11.5px] font-mono uppercase tracking-[0.18em] text-ink-500">{t.hero.hint}</p>
          </div>
          <div className="reveal visible mt-12 flex flex-wrap items-center gap-3">
            <a href="#stages" className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-[13.5px] font-medium text-ink-950 transition-all hover:bg-amber-300">
              {t.hero.cta}
              <MoveRight size={15} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="https://github.com/Eververdants/inkling" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-ink-100/15 px-5 py-2.5 text-[13.5px] text-ink-200 transition-all hover:border-amber-400/40 hover:text-amber-300">
              {t.hero.secondary}
              <ArrowUpRight size={14} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-5">
          <div className="reveal visible relative aspect-square w-full max-w-[460px] mx-auto md:ml-auto">
            <div className="absolute inset-0 rounded-[2rem] border border-ink-100/8" />
            <div className="absolute -inset-px rounded-[2rem]">
              <div aria-hidden className="absolute inset-0 rounded-[2rem]"
                style={{ background: 'linear-gradient(135deg, rgba(212,165,116,0.08), transparent 50%, rgba(212,165,116,0.05))' }} />
            </div>
            <div className="absolute inset-0 grid place-items-center p-10"><Convergence /></div>
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((p, i) => (
              <span key={i} aria-hidden className={`absolute ${p} h-3 w-3 border-amber-400/40`}
                style={{
                  borderTopWidth: p.includes('top') ? 1 : 0,
                  borderBottomWidth: p.includes('bottom') ? 1 : 0,
                  borderLeftWidth: p.includes('left') ? 1 : 0,
                  borderRightWidth: p.includes('right') ? 1 : 0,
                }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
