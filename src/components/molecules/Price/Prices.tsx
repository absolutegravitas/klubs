import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, Fragment } from 'react'
import cn from 'clsx'
import { Button } from '@/components/atoms'
import { SwrBrand } from '@/lib/swr-helpers'
import { getStripe } from '@/lib/stripe-client'
import LoginModal from '@/components/molecules/Auth/LoginModal'
import ExistingPurchase from '@/components/molecules/Auth/ExistingPurchase'
import { useUser } from '@/lib/useUser'
import { Price, ProductWithPrice } from '@/lib/types'
import { fetchPostJSON, postData } from '@/lib/api-helpers'
import { useRouter } from 'next/router'

export default function Prices({ data, colors }: any) {
  // console.log('price data: ', data)
  const router = useRouter()

  const brand: any = SwrBrand()
  const { user, isLoading, purchases } = useUser()
  const [loginPrompt, setLoginPrompt] = useState(false)
  const [alreadyBought, setAlreadyBought] = useState(false)
  const [initiateCheckout, setInitiateCheckout] = useState(false)

  // console.log('brand->', brand)
  // console.log('user purchases ->', purchases)

  const handleCheckout = async (price: Price) => {
    console.log('selected price ->', price)

    if (!user) {
      console.log('User not logged in. Loading login modal...')
      return setLoginPrompt(true)
    }
    console.log('user logged in: ', user)

    console.log('checking if already bought...')
    if (purchases && purchases.length > 0) {
      const alreadyBought = purchases.find(
        (purchase: any) => purchase.metadata.productId === price.product
      )
      if (alreadyBought) {
        console.log('already bought!')
        return setAlreadyBought(true)
      }
    }

    // no purchase, initiate checkout
    console.log('initiating checkout...')
    try {
      // construct data
      const checkoutData = {
        price: price,
        orgId: brand.name, // business id
        productId: data.product, // product id
        productSlug: window.location.pathname,
      }
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: checkoutData,
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      return alert((error as Error)?.message)
    } finally {
      setInitiateCheckout(false)
    }
  }

  return (
    <>
      {data && (
        <>
          {loginPrompt && (
            <LoginModal redirect={window.location.pathname + '#pricing'} />
          )}
          {alreadyBought && <ExistingPurchase />}

          {data.map((price: any) => (
            <>
              {price.button_text && (
                <article
                  key={price.sort}
                  className={cn(
                    `mx-auto w-full max-w-md flex-shrink-0 transform cursor-pointer px-5 py-6 font-display duration-500 hover:-translate-y-1 sm:w-1/2 lg:w-1/3`
                  )}
                >
                  <>
                    <div
                      className={cn(
                        price.highlight ? `border-2` : ``,
                        `overflow-hidden rounded bg-white shadow-md`
                      )}
                    >
                      <div className="p-4 py-5">
                        <p className="font-bold text-gray-700 text-md">
                          {price.heading}
                        </p>
                        <p className="mb-1.5 mt-1.5  text-gray-900">
                          <span className="text-4xl font-extrabold text-gray-900">
                            {Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: price.currency ? price.currency : 'USD',
                              minimumFractionDigits: 2,
                            }).format(price?.unit_amount / 100)}
                          </span>{' '}
                          <span className="text-base font-medium text-gray-500">
                            {price.type === 'recurring'
                              ? '/' + price.recurring.interval
                              : '/one time'}
                          </span>
                        </p>
                        <p className="text-gray-700">{price.text}</p>
                      </div>
                      {price.highlight && (
                        <>
                          <div
                            style={{
                              backgroundColor: brand?.accentColor
                                ? brand?.accentColor
                                : '#1D4ED8',
                            }}
                            className="flex p-4 text-white"
                          >
                            <div className="inline-flex items-center flex-1 font-medium">
                              <p>MOST POPULAR</p>
                            </div>
                          </div>
                        </>
                      )}
                      {price.attributes && (
                        <div className="px-4 pt-3 pb-4 bg-gray-100 border-t border-gray-200">
                          <div className="flex items-center pt-2">
                            <ul
                              role="list"
                              className={cn(
                                'order-last flex flex-col gap-y-3 text-sm',
                                price.highlight
                                  ? 'text-white'
                                  : 'text-slate-200'
                              )}
                            >
                              {price.attributes?.map((attribute: any) => (
                                <>
                                  <li
                                    key={attribute}
                                    className="flex space-x-3"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="flex-shrink-0 w-5 h-5 text-gray-900 material-symbols-outlined"
                                    >
                                      {attribute.icon}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      {attribute.text}
                                    </span>
                                  </li>
                                </>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <div className="px-4 py-6 ">
                        <Button
                          style={{
                            backgroundColor: brand?.accentColor
                              ? brand?.accentColor
                              : '#1D4ED8',
                          }}
                          onClick={(event: any) => {
                            event.preventDefault()
                            setInitiateCheckout(true)
                            handleCheckout(price)
                          }}
                          className={cn(
                            initiateCheckout ? `bg-gray-500 opacity-50` : ``,
                            'shadow-xs rounded-xs border-1 flex w-full cursor-pointer justify-center border  px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                          )}
                          Component="button"
                        >
                          {!initiateCheckout && (
                            <>
                              <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                                shopping_cart_checkout
                              </span>
                              <span>
                                {price.button_text
                                  ? price.button_text
                                  : 'Buy Now'}
                              </span>
                            </>
                          )}

                          {initiateCheckout && (
                            <>
                              <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                                autorenew
                              </span>
                              Please wait...
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                </article>
              )}
            </>
          ))}
        </>
      )}
    </>
  )
}
