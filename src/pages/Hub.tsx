import { useState, type ComponentType } from 'react'
import { PageTitle } from '../components/PageTitle'
import { SectionNav } from '../components/SectionNav'
import { el } from '../i18n/el'
import { BenefitsSection } from './hub/BenefitsSection'
import { ChecklistSection } from './hub/ChecklistSection'
import { ExamsSection } from './hub/ExamsSection'
import { LinksSection } from './hub/LinksSection'
import { OpportunitiesSection } from './hub/OpportunitiesSection'

const sections = ['benefits', 'checklist', 'links', 'exams', 'opportunities'] as const
type Section = (typeof sections)[number]

const views: Record<Section, ComponentType> = {
  benefits: BenefitsSection,
  checklist: ChecklistSection,
  links: LinksSection,
  exams: ExamsSection,
  opportunities: OpportunitiesSection,
}

/** Student Hub: benefits first, then checklist, links, exams and opportunities. */
export default function Hub() {
  const [section, setSection] = useState<Section>('benefits')
  const View = views[section]

  return (
    <>
      <PageTitle>{el.pages.hub}</PageTitle>
      <SectionNav
        sections={sections}
        labels={el.hub.sections}
        active={section}
        onChange={setSection}
        ariaLabel={el.hub.sectionsLabel}
      />
      <div role="tabpanel" className="flex flex-col gap-6">
        <View />
      </div>
    </>
  )
}
