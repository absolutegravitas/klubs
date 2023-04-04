import { Container } from '@/components/molecules'
import Link from 'next/link'
import { CourseMenu } from './CourseMenu'

export function CourseHeader({ data, setModule }: any) {
  return (
    <header className="sticky top-0 z-[99] border-b border-gray-200 bg-slate-50 py-5">
      <Container>
        <nav className="flex pb-5" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <Link
                  className="text-gray-400 hover:text-gray-500"
                  passHref
                  href="/account"
                  prefetch={false}
                ><span>
                    <span
                      className="flex-shrink-0 w-5 h-5 material-symbols-outlined"
                      aria-hidden="true"
                    >
                      cottage
                    </span>

                    <span className="sr-only">Home</span></span>
                </Link>
              </div>
            </li>

            {/* <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a
                  href="/account"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Account
                </a>
              </div>
            </li> */}
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 md:ml-4 hover:text-gray-700"
                >
                  {data.name ? data.name : 'Course Name'}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>

                <div className="text-sm font-medium text-gray-500 md:ml-4 hover:text-gray-700">
                  <CourseMenu modules={data?.modules} setModule={setModule}/>
                </div>
              </div>
            </li>
          </ol>
        </nav>

        <div className="pb-2 md:pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            {data.name ? data.name : 'Course Name'}
          </h3>
        </div>

        <div className="">
          <p className="hidden max-w-4xl mt-2 text-sm text-gray-500 md:flex">
            {data.description ? data.description : 'Course Name'}
          </p>
        </div>
      </Container>
    </header>
  )
}
