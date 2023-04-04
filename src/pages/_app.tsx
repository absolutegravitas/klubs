import 'focus-visible'
import '@/styles/tailwind.css'
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SwrBrand } from '@/lib/swr-helpers'
import { ThemeProvider } from 'next-themes'
// import { Head } from '@/components/organisms'

import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MyUserContextProvider } from '@/lib/useUser'

const Noop: FC = ({ children }: any) => <>{children}</>
export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  const brand: any = SwrBrand()

  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <SWRConfig
            value={{
              revalidateIfStale: false,
              revalidateOnFocus: false,
              dedupingInterval: 15000,
              // fetcher: (resource, init) =>
              //   fetch(resource, init).then((res) => res.json()),
            }}
          >
            {/* <Head /> */}
            {/* <ThemeProvider> */}
              <Layout pageProps={pageProps} brand={brand}>
                <Component {...pageProps} />
              </Layout>
            {/* </ThemeProvider> */}
          </SWRConfig>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}

// export default function MyApp({ Component, pageProps }: any) {
//   const { data: brand } = useSWR('brand', () => getBrand())
//   const { data: brandColors } = useSWR('brandColors', () => getBrandColors())
//   return (
//     <>
//       <SWRConfig
//         value={{
//           revalidateIfStale: false,
//           revalidateOnFocus: false,
//           dedupingInterval: 15000,
//           // fetcher: (resource, init) =>
//           //   fetch(resource, init).then((res) => res.json()),
//         }}
//       >
//         {/* <Head /> */}
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </SWRConfig>
//     </>
//   )
// }
