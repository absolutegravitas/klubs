import dynamic from 'next/dynamic'

const ProseHeading = dynamic(
  () => import('@/components/molecules/Prose/ProseHeading')
)
const CardTeam = dynamic(() => import('@/components/molecules/Card/CardTeam'))

export default function Team({ data, colors }: any) {
  // console.log('data->', data)

  return (
    <>
      {data && (
        <div className="bg-gray-100">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none font-display">
              <ProseHeading
                content={data?.text ? data.text : ''}
              />

              <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
                {data.team?.map((item: any) => (
                  <CardTeam
                    key={item.id}
                    data={item.directus_users_id}
                    colors={colors}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
