import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Team Contest — Duolingo project',
  description: 'Rood tegen Blauw. Leren als teamsport. Concept 3 van het Duolingo project.',
}

export default function TeamContestPage() {
  const concept = getConceptBySlug('team-contest')!
  return <ConceptDetailPage concept={concept} />
}
