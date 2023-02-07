import dynamic from 'next/dynamic'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)
const CardProduct = dynamic(
  () => import('@/components/molecules/Card/CardProduct')
)

export default function ProductsAll({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)


  return (
    <>
      {data && (
        <div className="">
          <div className="px-4 mx-auto font-display max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
              <ProseHeading
                content={data?.text ? data.text : ''}
              />

              <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                {data.products?.map((item: any) => (
                  <CardProduct key={item.id} data={item} colors={colors} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
