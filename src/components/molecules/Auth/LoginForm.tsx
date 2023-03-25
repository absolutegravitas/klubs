import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
} from '@/components/atoms/Icons'
import Link from 'next/link'
import { AuthLayout } from '@/components/molecules'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'clsx'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { SwrBrand } from '@/lib/swr-helpers'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/lib/api-helpers'

export default function LoginForm({ redirect }: any) {
  const router = useRouter()
  const brand: any = SwrBrand()
  const { user } = useUser()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: '',
  })
  // console.log('route ->', router.asPath)
  // console.log('asPath ->', redirect)
  // console.log(
  //   'full redirect string ->',
  //   (process.env.NEXT_PUBLIC_SITE_URL
  //     ? process.env.NEXT_PUBLIC_SITE_URL
  //     : 'http://localhost:3000') + redirect
  // )

  const handleSignin = async (e: any) => {
    e.preventDefault()

    setLoading(true)
    setMessage({})

    const { error } = await supabaseClient.auth.signIn(
      { email },
      {
        redirectTo:
          (process.env.NEXT_PUBLIC_SITE_URL
            ? process.env.NEXT_PUBLIC_SITE_URL
            : 'http://localhost:3000') + redirect,
      }
    )
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }

    setMessage({
      type: 'note',
      content: 'Check your email for the magic link.',
    })

    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn({ provider })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }

    if (user) {
      // console.log('user (on course/services page)->', user)
      router.reload()
    }
    setLoading(false)
  }

  return (
    <AuthLayout>
      {
        <>
          <div className={cn(`flex flex-col justify-center`)}>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-2 shadow-xs rounded-xs sm:px-10">
                <div className="relative ">
                  {message.content && (
                    <div
                      className={cn(
                        message.type === 'error' ? `bg-red-50` : `bg-blue-50`,
                        `mb-5 rounded-md p-4`
                      )}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span
                            className={cn(
                              message.type === 'error'
                                ? `text-red-700`
                                : `text-blue-700`,
                              `material-symbols-outlined align-middle text-2xl `
                            )}
                          >
                            info
                          </span>
                        </div>
                        <div className="flex-1 ml-3 md:flex md:justify-between">
                          <p
                            className={cn(
                              message.type === 'error'
                                ? `text-red-700`
                                : `text-blue-700`,
                              `text-sm`
                            )}
                          >
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        placeholder="joe@company.com"
                        name="email"
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full px-3 py-2 prose placeholder-gray-400 border border-gray-300 shadow-xs appearance-none rounded-xs focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: brand?.accentColor
                          ? brand?.accentColor
                          : '#1D4ED8',
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        setLoading(true)
                        handleSignin(e)
                      }}
                      // type="submit"
                      disabled={!email.length}
                      className={cn(
                        loading ? `bg-gray-500 opacity-50` : ``,
                        `shadow-xs rounded-xs border-1 flex w-full cursor-pointer justify-center border  px-4 py-2 text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`
                      )}
                    >
                      {!loading && (
                        <>
                          <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                            mail
                          </span>
                          Send Magic Link
                        </>
                      )}

                      {loading && (
                        <>
                          <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                            autorenew
                          </span>
                          Sending...
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social OAuth */}
                <div className="hidden">
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 text-gray-500 bg-gray-100">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div>
                        <button
                          className={
                            loading
                              ? `grayscale `
                              : `` +
                                `shadow-xs rounded-xs inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`
                          }
                          disabled={loading}
                          onClick={() => handleOAuthSignIn('google')}
                        >
                          <span className="sr-only">Sign in with Google</span>
                          <GoogleIcon
                            className="block w-6 h-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() => handleOAuthSignIn('facebook')}
                          className={
                            loading
                              ? `grayscale `
                              : `` +
                                `shadow-xs rounded-xs inline-flex w-full justify-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50`
                          }
                          disabled={loading}
                        >
                          <span className="sr-only">Sign in with Facebook</span>
                          <FacebookIcon
                            className="block w-6 h-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="text-sm">
                      <Link
                        style={{
                          color: brand?.accentColor
                            ? brand?.accentColor
                            : '#1D4ED8',
                        }}
                        className="font-medium hover:text-gray-500"
                        href="/account/signup"
                        passHref
                      >
                        Dont have an account? Click here to sign up.
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </AuthLayout>
  )
}
