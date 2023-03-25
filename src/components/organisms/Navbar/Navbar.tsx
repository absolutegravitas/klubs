import Link from 'next/link'
import Image from 'next/image'

import { Container, AccountButton, SignOutButton } from '@/components/molecules'
import { Logo } from '@/components/atoms/Icons'
import {
  MobileNavigation,
  NavItems,
  SignInButton,
} from '@/components/molecules'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useRouter } from 'next/router'
import { useUser } from '@/lib/useUser'

export default function Navbar({ data }: any) {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-[99] bg-slate-50 py-5">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center flex-initial font-bold md:mr-24"
            >
              <span className="flex items-center mr-2">
                {data.lightLogo ? (
                  <>
                    <span className="align-middle">
                      <Image
                        className="w-auto h-10 mr-2"
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
                  <>
                    <span className="flex w-auto h-10">
                      <Logo />
                    </span>
                  </>
                )}
              </span>
              <span className="font-semibold prose align-middle font-display">
                {data.name ? data.name : 'Company Name'}
              </span>
            </Link>
            <div className="hidden md:flex md:gap-x-6 ">
              {data.header && <NavItems data={data.header} />}
            </div>
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="-mr-1 md:hidden">
              <MobileNavigation data={data} />
            </div>
            {!user && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <SignInButton data={data} />
              </div>
            )}
            {user && (
              <>
                <div className="hidden md:ml-3 md:flex md:space-x-4">
                  <AccountButton data={data} />
                  <SignOutButton data={data} />
                </div>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}
