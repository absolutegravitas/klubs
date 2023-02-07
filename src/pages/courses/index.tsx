import dynamic from 'next/dynamic'
import {  Section } from '@/components/templates'
import { getPage } from '@/lib/queries'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('@/components/templates/Default/Layout'))
export default function Courses({ slug, preview, prefetchedData }: any) {
  // console.log('prefetchedData->', prefetchedData)
  const router = useRouter()
  if (!prefetchedData) {
    router.push('/404')
  }

  return (
    <>
      {prefetchedData?.sections?.map((section: any) => (
        <Section key={section.sort} section={section} />
      ))}
    </>
  )
}

Courses.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI.
// in DEV getStaticProps is run every time
// in PROD, this only runs once then revalidates based on the revalidate parameter
// context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
export async function getStaticProps(context: any) {
  const data = await getPage('courses')
  // console.log('server data->', data)
  // return props with data to component
  return {
    props: {
      slug: 'courses',
      preview: context.preview ? true : null,
      prefetchedData: data && data.data.length > 0 ? data.data[0] : null,
    },
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
