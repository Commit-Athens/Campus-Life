import { el } from '../i18n/el'
import { LogoMark } from './Logo'

/** Dark full-screen splash shown briefly on app open. */
export function Splash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-night px-6 text-center">
      <LogoMark className="size-20" />
      <p className="text-h1 text-white">
        {el.brand.name.replace(/Life$/, '')}
        <span className="text-primary">Life</span>
      </p>
      <p className="text-body text-white/80">{el.brand.tagline}</p>
    </div>
  )
}
