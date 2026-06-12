import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Team Contest — duoproject',
  description: 'Rood tegen Blauw. Leren als teamsport. Concept 3 van het duoproject.',
}

export default function TeamContestPage() {
  const concept = getConceptBySlug('team-contest')!
  return <ConceptDetailPage concept={concept} />
}
