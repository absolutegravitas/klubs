import dynamic from 'next/dynamic'

import { Container } from '@/components/molecules'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)

const Prices = dynamic(() => import('@/components/molecules/Price/Prices'))

export default function ProductPricing({ data, colors }: any) {
  console.log( '(received data) ', data)

  return (
    <>
      <section
        id="pricing"
        aria-label="What our customers are saying"
        className="py-10 bg-slate-50 sm:py-16"
      >
        <Container>
          {data && (
            <div className="bg-gray-50">
              <div className="px-4 mx-auto max-w-7xl font-display sm:px-6 lg:px-8">
                <div className="relative z-10 p-12">
                  <div className="text-center">
                    {data.text && <ProseHeading content={data.text} />}
                  </div>
                </div>

                {data && data.prices?.length > 0 && (
                  <div className="flex flex-wrap">
                    {data.prices ? (
                      <Prices data={data.prices} />
                    ) : (
                      <>
                        <span className="w-auto mr-3 align-middle material-symbols-outlined h-15 animate-spin">
                          autorenew
                        </span>
                        Loading prices...
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
