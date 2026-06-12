import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Gepersonaliseerde Lessen — duoproject',
  description: 'Leren over wat jou écht interesseert. Concept 1 van het duoproject.',
}

export default function PersonalizedLessonsPage() {
  const concept = getConceptBySlug('personalized-lessons')!
  return <ConceptDetailPage concept={concept} />
}
