import { useState, useEffect } from 'react'
import { CourseContent } from '../../../components/organisms/CourseContent/CourseContent'
import { CourseHeader } from '@/components/organisms/CourseContent/CourseHeader'
import { getCourseContent, getPage } from '@/lib/queries'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useUser } from '@/lib/useUser'

const Layout = dynamic(() => import('@/components/templates/Course/Layout'))
// routes if user not authenticated, check is server side each time
import { Loading } from '@/components/molecules'
import LoginForm from '@/components/molecules/Auth/LoginForm'

export default function Content({ slug, preview, prefetchedData }: any) {
  // console.log('slug ->', slug)

  const router = useRouter()
  const [module, setModule]: any = useState()
  const { isLoading, user, purchases } = useUser()
  let purchased = false

  if (!isLoading && user) {
    purchases?.map((purchase: any) => {
      // console.log(purchase)
      if (purchase.slug === slug) purchased = true
      // console.log('purchased ->', purchased)
    })
  }

  if (isLoading) return <Loading />
  if ((!isLoading && !user)
  //  || !purchased
  )
    return (
      <div className="min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight">
              {`:(`}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:tracking-tight">
                  Access Denied
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  You need to sign in to access this Course. Sign in or visit
                  our Courses Page to purchase this Course for instant access.
                  If you think this error is a mistake, please get in touch with
                  us.
                </p>
              </div>
            </div>

            <LoginForm />
          </main>
        </div>
      </div>
    )

  return (
    <>
      {prefetchedData && (
        <>
          <CourseHeader data={prefetchedData} setModule={setModule} />
          <CourseContent data={module} />
        </>
      )}
    </>
  )
}

Content.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
  const data = await getCourseContent(context.params.slug)
  // console.log('server data->', context.params.slug, '->', data)

  return {
    props: {
      slug: context.params.slug,
      preview: context.preview ? true : null,
      prefetchedData: !data ? null : data,
    }, // will be passed to the page component as props
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
export async function getStaticPaths(context: any) {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}
