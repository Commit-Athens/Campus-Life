import { BookOpen, Home, Megaphone, Settings, Users, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { ListRow } from '../../components/ListRow'
import { usefulLinks } from '../../data/usefulLinks'
import { forUniversity } from '../../data/universities'
import { useUniversity } from '../../hooks/useUniversity'
import { el } from '../../i18n/el'

const icons: Record<string, LucideIcon> = {
  'link-secretariat': Settings,
  'link-account': Settings,
  'link-library': BookOpen,
  'link-feed': Megaphone,
  'link-groups': Users,
}

/** Hub section: the university homepage, services reached through it, and shortcuts inside the app. */
export function LinksSection() {
  const { university } = useUniversity()
  const navigate = useNavigate()

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3">{el.links.title}</h2>
      <ListRow
        icon={Home}
        title={el.links.homepageTitle(university.shortName)}
        description={university.name}
        href={university.homepage}
      />
      {forUniversity(usefulLinks, university.id).map((link) =>
        link.kind === 'homepage' ? (
          <ListRow
            key={link.id}
            icon={icons[link.id] ?? Home}
            title={link.title}
            description={`${link.description} · ${el.links.viaHomepage(university.shortName)}`}
            href={university.homepage}
          />
        ) : (
          <ListRow
            key={link.id}
            icon={icons[link.id] ?? Home}
            tone="success"
            title={link.title}
            description={link.description}
            onClick={() => navigate(link.to)}
          />
        ),
      )}
    </section>
  )
}
