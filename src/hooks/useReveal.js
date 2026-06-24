import { useCallback } from 'react'

export function useReveal() {
  return useCallback((el) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
  }, [])
}
