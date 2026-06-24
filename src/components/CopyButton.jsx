import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* noop */
    }
  }, [text])
  return (
    <button
      onClick={handle}
      className="inline-flex items-center gap-1.5 rounded-md border border-ink-100/10 bg-ink-900/60 px-2.5 py-1.5 text-[11px] font-mono text-ink-300 transition-all hover:border-amber-400/40 hover:text-amber-300"
      aria-label="Copy"
    >
      {copied ? <Check size={12} strokeWidth={1.6} /> : <Copy size={12} strokeWidth={1.6} />}
      {copied ? 'COPIED' : 'COPY'}
    </button>
  )
}
