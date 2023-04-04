import dynamic from 'next/dynamic'
import { PageNotFound } from '@/components/templates'

const Layout = dynamic(() => import('@/components/templates/Default/Layout'))

export default function NotFound() {
  return (
    <>
      <main>
        <PageNotFound />
      </main>
    </>
  )
}

NotFound.Layout = Layout
