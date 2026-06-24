import { GithubMark } from './GithubMark'
import { Wordmark } from './Wordmark'

export function Footer({ t }) {
  return (
    <footer className="relative border-t border-ink-100/8 py-16">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-[2.2rem] tracking-tight" />
            <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.7] text-ink-400">
              {t.footer.line1}
            </p>
            <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.7] text-ink-500">
              {t.footer.line2}
            </p>
          </div>

          {t.footer.cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-500">
                {col.title}
              </div>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.text || l}>
                    <a
                      href={l.href || '#'}
                      target={l.href?.startsWith('http') ? '_blank' : undefined}
                      rel={l.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[13.5px] text-ink-300 transition-colors hover:text-amber-400"
                    >
                      {l.text || l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-100/8 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3 font-mono text-[11.5px] text-ink-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span>MIT · {new Date().getFullYear()} · Eververdants</span>
          </div>
          <div className="flex items-center gap-5 text-[12.5px] text-ink-400">
            <a
              href="https://github.com/Eververdants/inkling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-amber-400"
            >
              <GithubMark size={13} className="opacity-80" />
              GitHub
            </a>
            <span className="font-mono text-ink-700">/</span>
            <a href="#" className="transition-colors hover:text-amber-400">
              v1.0.0
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
