import dynamic from 'next/dynamic'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)
const CardPost = dynamic(() => import('@/components/molecules/Card/CardPost'))

export default function PostsRecent({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)


  return (
    <>
      {data && (
        <div className="bg-gray-100">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center font-display sm:py-24 lg:py-32 lg:max-w-none">
              <ProseHeading
                content={data?.text ? data.text : ''}
              />

              <div
                className={`mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-${
                  data.limit ? data.limit : 3
                } lg:gap-x-6`}
              >
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
