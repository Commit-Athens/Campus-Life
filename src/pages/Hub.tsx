import { useState } from 'react'
import { NextExamCard } from '../components/NextExamCard'
import { PageTitle } from '../components/PageTitle'
import { SectionNav } from '../components/SectionNav'
import { exams } from '../data/exams'
import { forUniversity } from '../data/universities'
import { useMyExams } from '../hooks/useMyExams'
import { useUniversity } from '../hooks/useUniversity'
import { el } from '../i18n/el'
import { daysUntil } from '../i18n/formatDate'
import { BenefitsSection } from './hub/BenefitsSection'
import { ChecklistSection } from './hub/ChecklistSection'
import { ExamsSection } from './hub/ExamsSection'
import { LinksSection } from './hub/LinksSection'
import { OpportunitiesSection } from './hub/OpportunitiesSection'
import { PassesSection } from './hub/PassesSection'

const sections = ['benefits', 'passes', 'checklist', 'links', 'exams', 'opportunities'] as const
type Section = (typeof sections)[number]

/** Student Hub: next-exam countdown on top, then benefits, passes, checklist, links, exams and opportunities. */
export default function Hub() {
  const { university } = useUniversity()
  const [section, setSection] = useState<Section>('benefits')
  const { myExamIds, toggleExam } = useMyExams()

  const nextExam =
    forUniversity(exams, university.id)
      .filter((e) => myExamIds.includes(e.id) && daysUntil(e.date) >= 0)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0] ?? null

  return (
    <>
      <PageTitle>{el.pages.hub}</PageTitle>
      <NextExamCard exam={nextExam} onOpen={() => setSection('exams')} />
      <SectionNav
        sections={sections}
        labels={el.hub.sections}
        active={section}
        onChange={setSection}
        ariaLabel={el.hub.sectionsLabel}
      />
      <div role="tabpanel" className="flex flex-col gap-6">
        {section === 'benefits' && <BenefitsSection />}
        {section === 'passes' && <PassesSection />}
        {section === 'checklist' && <ChecklistSection />}
        {section === 'links' && <LinksSection />}
        {section === 'exams' && <ExamsSection myExamIds={myExamIds} onToggle={toggleExam} />}
        {section === 'opportunities' && <OpportunitiesSection />}
      </div>
    </>
  )
}
