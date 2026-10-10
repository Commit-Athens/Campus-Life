import { Link } from 'react-router'
import { Logo } from '../components/Logo'
import { RoadmapLists } from '../components/RoadmapLists'
import { el } from '../i18n/el'
import { useLanguage } from '../i18n/languageContext'

/** Public feature list. Works without signing in, in the language chosen in settings. */
export default function Roadmap() {
  useLanguage()
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 bg-page px-4 py-10">
      <header className="flex flex-col gap-3">
        <Logo />
        <h1 className="text-h1">{el.more.roadmap.title}</h1>
        <p className="text-caption text-muted">{el.more.roadmap.intro}</p>
      </header>
      <RoadmapLists />
      <Link to="/feed" className="min-h-11 text-caption font-semibold text-primary">
        {el.more.roadmap.back}
      </Link>
    </main>
  )
}
