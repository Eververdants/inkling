import { useState, useEffect } from 'react'
import { I18N } from './data/i18n'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Stages } from './components/Stages'
import { How } from './components/How'
import { Sample } from './components/Sample'
import { Install } from './components/Install'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'

function App() {
  const [lang, setLang] = useState('zh')
  const [scrolled, setScrolled] = useState(false)
  const t = I18N[lang]

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="relative">
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} scrolled={scrolled} t={t} />
      <main>
        <Hero t={t} />
        <Stats t={t} />
        <Stages t={t} />
        <How t={t} />
        <Sample t={t} />
        <Install t={t} />
        <CTA t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
