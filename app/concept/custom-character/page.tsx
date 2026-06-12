import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Eigen Karakter Maken — duoproject',
  description: 'Jouw karakter, jouw regels — in de Duolingo-wereld. Concept 2 van het duoproject.',
}

export default function CustomCharacterPage() {
  const concept = getConceptBySlug('custom-character')!
  return <ConceptDetailPage concept={concept} />
}
