import { ChevronRight } from 'lucide-react'
import { GithubMark } from './GithubMark'
import { Wordmark } from './Wordmark'

export function Nav({ lang, setLang, scrolled, t }) {
  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b backdrop-blur-xl bg-ink-950/70 border-ink-100/10'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <Wordmark className="text-[1.35rem] tracking-tight" />
          <span className="hidden md:inline-block text-[10.5px] font-mono uppercase tracking-[0.18em] text-ink-500 group-hover:text-amber-400/80 transition-colors">
            {t.nav.tag}
          </span>
        </a>

        <nav className="flex items-center gap-1.5">
          <a
            href="https://github.com/Eververdants/inkling"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-ink-300 hover:text-amber-400 transition-colors"
          >
            <GithubMark size={14} className="opacity-80" />
            <span>GitHub</span>
          </a>
          <div className="mx-1.5 h-4 w-px bg-ink-100/10" />
          <div className="inline-flex rounded-full border border-ink-100/10 p-0.5 text-[11.5px] font-mono tracking-wider">
            {['zh', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={[
                  'rounded-full px-2.5 py-1 transition-all duration-300',
                  lang === l
                    ? 'bg-amber-400 text-ink-950'
                    : 'text-ink-400 hover:text-ink-100',
                ].join(' ')}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="#install"
            className="ml-1 hidden md:inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 px-3.5 py-1.5 text-[12.5px] text-amber-300 hover:bg-amber-400 hover:text-ink-950 transition-all duration-300"
          >
            {t.nav.cta}
            <ChevronRight size={13} strokeWidth={1.5} />
          </a>
        </nav>
      </div>
    </header>
  )
}
