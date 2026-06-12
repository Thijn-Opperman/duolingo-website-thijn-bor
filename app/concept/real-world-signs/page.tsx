import { type Metadata } from 'next'
import ConceptDetailPage from '@/components/ConceptDetailPage'
import { getConceptBySlug } from '@/lib/concepts'

export const metadata: Metadata = {
  title: 'Echte Wereld Borden — duoproject',
  description: 'De straat als lesruimte. Duolingo buiten de app. Concept 4 van het duoproject.',
}

export default function RealWorldSignsPage() {
  const concept = getConceptBySlug('real-world-signs')!
  return <ConceptDetailPage concept={concept} />
}
