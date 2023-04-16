import dynamic from 'next/dynamic'
import { Section } from '@/components/templates'
import { getProduct } from '@/lib/queries'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('@/components/templates/Default/Layout'))
export default function Course({ slug, preview, prefetchedData }: any) {
  console.log('prefetchedData->', prefetchedData)
  const router = useRouter()
  if (!prefetchedData) {
    router.push('/404')
  }

  return (
    <>
      {prefetchedData?.sections?.map((section: any) => (
        <Section key={section.sort} section={section} productId={prefetchedData.stripeId}/>
      ))}
    </>
  )
}

Course.Layout = Layout

// If
// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI.
// in DEV getStaticProps is run every time
// in PROD, this only runs once then revalidates based on the revalidate parameter
// context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
export async function getStaticProps(context: any) {
  const data = await getProduct(context.params.slug)
  console.log('server product data->', data)
  console.log('server params->', context.params)

  // return props with data to component
  return {
    props: {
      slug: context.params.slug,
      preview: context.preview ? true : null,
      prefetchedData: data && data.data.length > 0 ? data.data[0] : null,
    },
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

export async function getStaticPaths() {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}
