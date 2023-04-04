import dynamic from 'next/dynamic'
import { useState } from 'react'
import { getPosts } from '@/lib/queries'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)
const CardPost = dynamic(() => import('@/components/molecules/Card/CardPost'))

export default function Posts({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)
  const [pageIndex, setPageIndex] = useState(0)

  return (
    <>
      {data && (
        <div className="bg-gray-100">
          <div className="px-4 mx-auto font-display max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:max-w-none lg:py-32">
              <ProseHeading content={data?.text ? data.text : ''} />

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
                {data.posts?.map((post: any) => (
                  <CardPost key={post.id} data={post} colors={colors} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
