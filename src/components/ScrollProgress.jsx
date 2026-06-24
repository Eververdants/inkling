import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const h = () => {
      const top = window.scrollY
      const h_ = document.documentElement.scrollHeight - window.innerHeight
      setP(h_ > 0 ? (top / h_) * 100 : 0)
    }
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <div className="fixed left-0 top-0 z-[60] h-px w-full bg-ink-100/5">
      <div
        className="h-full bg-amber-400 transition-[width] duration-150 ease-out"
        style={{ width: `${p}%` }}
      />
    </div>
  )
}
