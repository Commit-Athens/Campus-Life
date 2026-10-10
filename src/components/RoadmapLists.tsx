import { el } from '../i18n/el'

/** Upcoming features, then the ones already in the app. Same list on /roadmap and in More. */
export function RoadmapLists() {
  const { upcomingTitle, builtTitle, upcoming, built } = el.more.roadmap
  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{upcomingTitle}</h2>
        <ul className="flex flex-col gap-2">
          {upcoming.map((item) => (
            <li key={item} className="rounded-2xl bg-page px-4 py-3 text-caption ring-1 ring-surface">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{builtTitle}</h2>
        <ul className="flex flex-col gap-2">
          {built.map((item) => (
            <li key={item} className="px-4 py-2 text-caption text-muted line-through">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
