import Image from 'next/future/image'
import Link from 'next/link'
import { Logo } from '@/components/atoms/Icons'
import { SwrBrand } from '@/lib/swr-helpers'

export default function PageNotFound({ statusCode }: any) {
  const brand: any = SwrBrand()

  return (
    <>
      <div className="flex flex-col min-h-full pt-16 pb-12 bg-white">
        <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center flex-shrink-0">
            <Link href="/">
              <a className="inline-flex">
                <span className="sr-only">Workflow</span>
                <Logo />
              
              </a>
            </Link>
          </div>
          <div className="py-16 font-display">
            <div className="text-center">
              <p
                style={{
                  color: brand?.accentColor ? brand?.accentColor : '#1D4ED8',
                }}
                className="text-sm font-semibold tracking-wide uppercase"
              >
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/">
                  <a
                    style={{
                      color: brand?.accentColor
                        ? brand?.accentColor
                        : '#1D4ED8',
                    }}
                    className="text-base font-medium hover:text-gray-500"
                  >
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
