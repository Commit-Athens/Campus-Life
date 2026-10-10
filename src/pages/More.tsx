import { EmptyState } from '../components/EmptyState'
import { PageTitle } from '../components/PageTitle'
import { el } from '../i18n/el'

export default function More() {
  return (
    <>
      <PageTitle>{el.pages.more}</PageTitle>
      <EmptyState title={el.comingSoon.title} description={el.comingSoon.description} />
    </>
  )
}
