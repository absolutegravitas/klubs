import Image from 'next/image'
import { SwrBrand } from '@/lib/swr-helpers'

export default function CardTeam({ data, colors }: any) {
  // console.log('CardTeam: ', data)
  const brand: any = SwrBrand()

  return (
    <>
      {data && (
        <>
          <div className="relative pb-5 group">
            <>
              <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                {data.avatar && data.avatar !== '' ? (
                  <Image
                    className="object-cover object-center w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data.avatar}`}
                    // layout="responsive"
                    width={900}
                    height={900}
                    alt={data.first_name || ''}
                    priority
                  />
                ) : (
                  <Image
                    className="object-cover object-center w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/bb8b4b63-8ca3-4e7f-a2db-de4ac695f442`}
                    // layout="responsive"
                    width={900}
                    height={900}
                    alt=""
                    priority
                  />
                )}
              </div>
              <h3 className="mt-6 font-extrabold prose prose-lg text-left">
                <span
                  style={{
                    color: brand?.accentColor
                      ? brand?.accentColor
                      : '#1D4ED8',
                  }}
                  className="absolute inset-0"
                />
                {data.first_name + ' ' + data.last_name}
              </h3>
              <p className="font-semibold prose text-left text-gray-800 prose-base">
                {data.title}
              </p>
              <p className="prose text-left text-gray-800 prose-base">
                {data.description}
              </p>
            </>
          </div>
        </>
      )}
    </>
  )
}
