import dynamic from 'next/dynamic'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)

const CardVideo = dynamic(() => import('@/components/molecules/Card/CardVideo'))
export default function ProductPeek({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  return (
    <>
      {data && (
        <div className="bg-gray-100">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:max-w-none lg:py-32">
              <ProseHeading content={data?.text ? data.text : ''} />

              <section className="container grid grid-cols-1 p-10 mx-auto duration-500 transform md:p-auto gap-y-10 gap-x-10 lg:grid-cols-2 2xl:grid-cols-2">
                {data.videos?.map((item: any) => (
                  <>
                    <CardVideo key={item.id} data={item} colors={colors} />
                  </>
                ))}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
