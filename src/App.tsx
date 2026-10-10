import { BookOpen, Gift, MapPin, Star, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './components/Button'
import { Chip, Tag } from './components/Chip'
import { EmptyState } from './components/EmptyState'
import type { Tone } from './components/IconCircle'
import { ListRow } from './components/ListRow'
import { SearchInput } from './components/SearchInput'
import { el } from './i18n/el'

// Temporary component showcase. Replaced by the app shell in the next step.
type Category = keyof typeof el.benefitCategories

type DemoItem = {
  id: string
  category: Exclude<Category, 'all'>
  title: string
  description: string
  icon: LucideIcon
  tone: Tone
}

const demoItems: DemoItem[] = [
  { id: 'pass', category: 'transport', title: 'Φοιτητικό πάσο (δείγμα)', description: 'Μειωμένο εισιτήριο στα ΜΜΜ', icon: MapPin, tone: 'primary' },
  { id: 'meals', category: 'food', title: 'Δωρεάν σίτιση (δείγμα)', description: 'Λέσχη για δικαιούχους φοιτητές', icon: Gift, tone: 'success' },
  { id: 'books', category: 'books', title: 'Δωρεάν συγγράμματα (δείγμα)', description: 'Επιλογή συγγραμμάτων ανά μάθημα', icon: BookOpen, tone: 'warning' },
  { id: 'cafe', category: 'food', title: 'Έκπτωση σε καφέ (δείγμα)', description: '-15% με φοιτητική ταυτότητα', icon: Star, tone: 'error' },
]

const categories = Object.keys(el.benefitCategories) as Category[]

export default function App() {
  const [category, setCategory] = useState<Category>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const q = query.trim().toLocaleLowerCase('el')
  const visible = demoItems.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (q === '' || `${item.title} ${item.description}`.toLocaleLowerCase('el').includes(q)),
  )

  const clearFilters = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-h1">
          Campus<span className="text-primary">Life</span>
        </h1>
        <p className="text-caption text-muted">{el.demo.intro}</p>
      </header>

      <SearchInput value={query} onChange={setQuery} />

      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{el.demo.chips}</h2>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
          {categories.map((c) => (
            <Chip key={c} label={el.benefitCategories[c]} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
        <div className="flex gap-2">
          <Tag label="Μαθηματικά" />
          <Tag label="Φυσική" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{el.demo.list}</h2>
        {visible.length === 0 ? (
          <EmptyState
            title={el.common.noResults}
            description={el.common.noResultsHint}
            action={<Button onClick={clearFilters}>{el.common.clearFilters}</Button>}
          />
        ) : (
          visible.map((item) => (
            <ListRow
              key={item.id}
              icon={item.icon}
              tone={item.tone}
              title={item.title}
              description={selected === item.id ? `✓ ${el.demo.selected}` : item.description}
              onClick={() => setSelected(selected === item.id ? null : item.id)}
            />
          ))
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-h3">{el.demo.buttons}</h2>
        <Button onClick={clearFilters}>{el.common.clearFilters}</Button>
        <Button variant="secondary" onClick={() => setQuery('')}>
          {el.demo.secondaryAction}
        </Button>
      </section>
    </main>
  )
}
