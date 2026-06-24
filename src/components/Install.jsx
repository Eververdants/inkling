import { Terminal, Command } from 'lucide-react'
import { CopyButton } from './CopyButton'
import { useReveal } from '../hooks/useReveal'

export function Install({ t }) {
  const revealRef = useReveal()
  const revealRef2 = useReveal()
  return (
    <section id="install" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-amber-400/80">
              {t.installLabel}
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink-50">
              {t.installTitle}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.75] text-ink-300">
              {t.installDesc}
            </p>
          </div>
        </div>

        <div ref={revealRef} className="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-900/50 p-1.5">
            <div className="flex items-center justify-between border-b border-ink-100/8 px-5 py-3 text-[11px] font-mono text-ink-500">
              <span className="flex items-center gap-2">
                <Terminal size={12} strokeWidth={1.5} className="text-amber-400/70" />
                npm / npx
              </span>
              <CopyButton text={t.installCmd} />
            </div>
            <div className="flex items-center gap-2 px-5 py-5 font-mono text-[14px] text-ink-100">
              <span className="text-amber-400">$</span>
              <span>{t.installCmd}</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-amber-400/70" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-900/50 p-1.5">
            <div className="flex items-center justify-between border-b border-ink-100/8 px-5 py-3 text-[11px] font-mono text-ink-500">
              <span className="flex items-center gap-2">
                <Command size={12} strokeWidth={1.5} className="text-amber-400/70" />
                claude code plugin
              </span>
              <span className="text-ink-500">{t.installAlt}</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-5 font-mono text-[14px] text-ink-100">
              <span className="text-amber-400">$</span>
              <span>{t.installAltCmd}</span>
            </div>
          </div>
        </div>

        <div ref={revealRef2} className="reveal mt-16">
          <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-500">
            {t.compat}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {t.compatList.map((c) => (
              <span
                key={c}
                className="font-display text-[1.2rem] font-light tracking-[-0.01em] text-ink-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
