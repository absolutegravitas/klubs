import { Logo } from '@/components/atoms/Icons'
import { Container } from '@/components/molecules'
import { NavLink } from '@/components/atoms'
import Image from 'next/image'

export default function Footer({ data }: any) {
  // console.log('Footer: ', data)

  return (
    <>
      {data && (
        <footer
          className="bg-slate-100 font-display"
          aria-labelledby="footer-heading"
        >
          <Container>
            <div className="pt-16 pb-10">
              {data.lightLogo ? (
                <>
                  <span className="align-middle">
                    <Image
                      className="w-auto h-24 mx-auto"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.darkLogo}`}
                      // layout="fill"
                      width={500}
                      height={500}
                      alt={data?.name || 'Company Name'}
                      // priority
                    />
                  </span>
                </>
              ) : (
                <span className="flex w-auto h-10">
                  <Logo className="w-auto h-24 mx-auto" />
                </span>
              )}

              <div className="relative px-4 mx-auto -mt-12 max-w-7xl font-display sm:px-6 lg:px-8">
                <dl className="grid max-w-2xl grid-cols-1 mx-auto mt-16 text-center gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-3xl lg:grid-cols-3 lg:gap-x-8">
                  {data.footer.map((column: any) => (
                    <div key={column.sort} className="pt-4">
                      <dt className="text-base font-semibold text-gray-900">
                        {column.item.name}
                      </dt>

                      {column.item.links.map(
                        ({ id, item, collection }: any) => {
                          let coll = ''

                          switch (collection) {
                            case 'Posts':
                              coll = 'blog/'
                              break
                            case 'Products':
                              coll = item.type + 's/'
                              break
                          }

                          return (
                            <dd key={id} className="mt-2 text-sm text-gray-500">
                              <NavLink
                                href={
                                  ((item.slug === 'home' || item.slug === '') &&
                                    '/') ||
                                  (collection === 'CustomLinks'
                                    ? item.slug
                                    : '/' + coll + item.slug)
                                }
                              >
                                {item.name}
                              </NavLink>
                            </dd>
                          )
                        }
                      )}
                    </div>
                  ))}
                </dl>
                <div className="pt-8 mt-12 border-t border-gray-200 max-w-none">
                  <p className="text-sm text-center text-gray-400">
                    &copy; 2022 {data.name}. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      )}
    </>
  )
}
