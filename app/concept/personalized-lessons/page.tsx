import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Gepersonaliseerde Lessen — Duolingo project',
  description: 'Leren over wat jou écht interesseert. Concept 1 van het Duolingo project.',
}

export default function PersonalizedLessonsPage() {
  const concept = getConceptBySlug('personalized-lessons')!
  return <ConceptDetailPage concept={concept} />
}
