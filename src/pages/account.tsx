// generic
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { SwrBrand } from '@/lib/swr-helpers'
import Link from 'next/link'
import cn from 'clsx'

import { Loading } from '@/components/molecules'
//data
import { useUser } from '@/lib/useUser'
import { withPageAuth, User } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useState } from 'react'
import { ProseGeneral } from '@/components/molecules'
import { postData } from '@/lib/api-helpers'

//ui components
const Layout = dynamic(() => import('@/components/templates/Default/Layout'))
const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)
// routes if user not authenticated, check is server side each time
export const getServerSideProps = withPageAuth({
  redirectTo: '/signin',
})

export default function Account() {
  const brand: any = SwrBrand()
  const [loading, setLoading] = useState(false)
  const { isLoading, user, purchases } = useUser()
  const [gotoContent, setGotoContent] = useState(false)

  let showcases: any[] = []
  if (!isLoading && user) {
    purchases?.map((purchase: any) => {
      purchase.showcases?.map((showcase: any) => {
        showcases.push(...showcases, showcase.id)
      })
    })
  }

  showcases = [...new Set(showcases)]

  if (isLoading) return <Loading />
  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })
      window.location.assign(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
    setLoading(false)
  }
  return (
    <>
      {purchases && (
        <div className="px-4 mx-auto max-w-7xl font-display sm:px-6 lg:px-8">
          <div className="max-w-3xl py-8 mx-auto text-center lg:max-w-none">
            <ProseHeading content={'Your Account'} />
            <ProseGeneral
              content={
                'Access your course content here and manage your billing details via Stripe from this page. Your recurring subscriptions and securely update card details by visiting the Stripe Customer Portal. ' +
                (showcases
                  ? `Your purchases also give you access to our Video Showcase Library.`
                  : '')
              }
            />
            <div className="my-4 overflow-hidden bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setGotoContent(true)
                  redirectToCustomerPortal()
                }}
                action="/api/checkout-session"
                method="POST"
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: brand?.accentColor
                      ? brand?.accentColor
                      : '#1D4ED8',
                  }}
                  className={cn(
                    gotoContent ? `bg-gray-500 opacity-50` : ``,
                    'shadow-xs rounded-xs relative inline-flex items-center border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                  )}

                  // className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent shadow-xs rounded-xs hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {!gotoContent && (
                    <>
                      <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                        arrow_forward
                      </span>
                      <span>Stripe Customer Portal</span>
                    </>
                  )}

                  {gotoContent && (
                    <>
                      <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                        autorenew
                      </span>
                      Please wait...
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          {/* <div className="mt-8 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {purchases?.map((item: any) => (
              <div key={item.id} className="relative pb-5 ">
                <>
                  <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    {item.image && item.image !== '' ? (
                      <Image
                        className="object-cover object-center w-full h-full"
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${item?.image}`}
                        // layout="responsive"
                        width={800}
                        height={800}
                        alt={item?.name || ''}
                      />
                    ) : (
                      <Image
                        className="object-cover object-center w-full h-full"
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1153"
                        // layout="responsive"
                        width={800}
                        height={800}
                        alt=""
                      />
                    )}
                  </div>
                  <h3 className="mt-6 font-extrabold text-left">
                    <span
                      style={{
                        color: brand?.accentColor
                          ? brand?.accentColor
                          : '#1D4ED8',
                      }}
                      className="absolute inset-0"
                    />
                    {item.name}
                  </h3>
                  <p className="prose text-left text-gray-800 prose-base">
                    {item.description}
                  </p>

                  {item.type === 'course' && (
                    <div className="py-3 mt-3 sm:mt-0 sm:flex-shrink-0">
                      <a
                        href={'/' + item.type + 's/' + item.slug}
                        // style={{
                        //   backgroundColor: brand?.accentColor
                        //     ? brand?.accentColor
                        //     : '#1D4ED8',
                        // }}
                        className={cn(
                          gotoContent ? `bg-gray-500 opacity-50` : ``,
                          'shadow-xs rounded-xs border-1 flex w-full cursor-pointer justify-center border px-4  py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                        )}

                        // className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent shadow-xs rounded-xs hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {!gotoContent && (
                          <>
                            <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                              arrow_forward
                            </span>
                            {item.name}
                          </>
                        )}

                        {gotoContent && (
                          <>
                            <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                              autorenew
                            </span>
                            Please wait...
                          </>
                        )}
                      </a>
                    </div>
                  )}
                </>
              </div>
            ))}
          </div> */}
          <div className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Your current purchases
              </h2>

              <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {purchases.map((product) => (
                  <div key={product.id} className="relative group">
                    <div className="w-full overflow-hidden bg-gray-200 rounded-xs min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      {product.image && product.image !== '' ? (
                        <Image
                          className="object-cover object-center w-full h-full"
                          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${product?.image}`}
                          // layout="responsive"
                          width={800}
                          height={800}
                          alt={product?.name || ''}
                        />
                      ) : (
                        <Image
                          className="object-cover object-center w-full h-full"
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1153"
                          // layout="responsive"
                          width={800}
                          height={800}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="flex justify-between mt-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700">
                          {!gotoContent && (
                            <>
                              <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                                arrow_forward
                              </span>
                            </>
                          )}

                          {gotoContent && (
                            <>
                              <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                                autorenew
                              </span>
                              Please wait...
                            </>
                          )}
                          <Link
                            passHref
                            href={
                              '/' +
                              product.type +
                              's/' +
                              product.slug +
                              (product.type === 'course' ? '/content' : '')
                            }
                          >
                            <span><span
                              aria-hidden="true"
                              className="absolute inset-0 "
                            />
                            {product.name}</span>
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showcases && (
        <>
          <div className="bg-white font-display ">
            <div className="px-4 mx-auto max-w-7xl font-display sm:px-6 lg:px-8">
              <div className="max-w-3xl py-8 mx-auto text-center lg:max-w-none">
                <ProseHeading content={'Media Library'} />
                <ProseGeneral
                  content={`Great news! Your purchases give you access to this Media
                  Library with hundreds of hours of additional curated content.`}
                />
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                  {showcases.map((showcase: any) => (
                    <div key={showcase} className="relative group">
                      <div
                        style={{
                          padding: '100% 0 0 0',
                          position: 'relative',
                        }}
                      >
                        <iframe
                          src={`https://vimeo.com/showcase/${showcase}/embed`}
                          allowFullScreen
                          frameBorder="0"
                          style={{
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                          }}
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

Account.Layout = Layout
