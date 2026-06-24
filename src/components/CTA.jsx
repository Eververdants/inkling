import { Quote, MoveRight } from 'lucide-react'

export function CTA({ t }) {
  return (
    <section id="cta" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Quote
          className="absolute left-1/2 top-12 -translate-x-1/2 text-amber-400/15"
          size={140}
          strokeWidth={0.5}
        />
        <div className="relative text-center">
          <h2 className="font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-light leading-[1.05] tracking-[-0.035em] text-ink-50">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-7 max-w-[44ch] text-[16px] leading-[1.75] text-ink-300">
            {t.cta.desc}
          </p>
          <div className="mt-12">
            <a
              href="https://github.com/Eververdants/inkling"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-7 py-3.5 text-[14.5px] font-medium text-ink-950 transition-all hover:bg-amber-300 hover:shadow-[0_0_36px_rgba(212,165,116,0.35)]"
            >
              {t.cta.btn}
              <MoveRight size={16} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
              {t.cta.sub}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
