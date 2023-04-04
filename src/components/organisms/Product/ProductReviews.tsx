import dynamic from 'next/dynamic'
import { Container } from '@/components/molecules'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)

const Review = dynamic(() => import('@/components/molecules/Review/Review'))

export default function ProductReviews({ data, colors }: any) {
  // console.log('ProductReviews->', data)
  return (
    <>
      <section
        id="testimonials"
        aria-label="What our customers are saying"
        className="py-20 bg-slate-50 sm:py-32"
      >
        <Container>
          {data && (
            <div className="bg-gray-50">
              <div className="px-4 py-12 mx-auto max-w-7xl font-display sm:px-6 lg:py-16 lg:px-8">
                <div className="relative z-10 p-12">
                  <div className="text-center">
                    {data.text && <ProseHeading content={data.text} />}
                  </div>
                </div>

                <div className="grid gap-6 text-center md:grid-cols-3 lg:gap-12">
                  {data.items?.map((review: any) => (
                    <>
                      <Review
                        key={review.id}
                        data={review.ReviewId}
                        colors={colors}
                      />
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
