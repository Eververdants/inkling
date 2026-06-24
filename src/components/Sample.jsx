import { FileText } from 'lucide-react'
import { CopyButton } from './CopyButton'
import { SAMPLE_PROPOSAL } from '../data/sampleProposal'
import { highlightMarkdown } from '../utils/highlightMarkdown'
import { useReveal } from '../hooks/useReveal'

export function Sample({ t }) {
  const revealRef = useReveal()
  return (
    <section id="sample" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-amber-400/80">
              {t.sampleLabel}
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink-50">
              {t.sampleTitle}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.75] text-ink-300">
              {t.sampleDesc}
            </p>
          </div>
        </div>

        <div ref={revealRef} className="reveal overflow-hidden rounded-2xl border border-ink-100/8 bg-ink-900/40 shadow-2xl shadow-black/30">
          {/* File bar */}
          <div className="flex items-center justify-between border-b border-ink-100/8 bg-ink-900/80 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11.5px] text-ink-400">
                <FileText size={12} strokeWidth={1.5} className="text-amber-400/70" />
                <span>{t.sampleFile}</span>
              </div>
            </div>
            <CopyButton text={SAMPLE_PROPOSAL} />
          </div>
          <pre className="overflow-x-auto p-6 md:p-10 font-mono text-[12.5px] leading-[1.85] text-ink-200">
            <code dangerouslySetInnerHTML={{ __html: highlightMarkdown(SAMPLE_PROPOSAL) }} />
          </pre>
        </div>
      </div>
    </section>
  )
}
