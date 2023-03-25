import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { SwrBrand } from '@/lib/swr-helpers'

const Button = dynamic(() => import('@/components/atoms/Button/ButtonGeneral'))

export default function CardProduct({ data, colors }: any) {
  // console.log('ProductCard :', data)
  const brand: any = SwrBrand()

  return (
    <>
      {data && (
        <>
          <div className="relative pb-5 cursor-pointer group">
            <Link
              href={'/' + data.type + 's/' + data.slug}
              className=""
              passHref
            >
              <span>
                <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1 group-hover:opacity-75 sm:h-64">
                  {data.image && data.image !== '' ? (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                      // layout="responsive"
                      width={1000}
                      height={1000}
                      alt={data?.name || ''}
                    />
                  ) : (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1153"
                      // layout="responsive"
                      width={1000}
                      height={1000}
                      alt=""
                    />
                  )}
                </div>
                <h3 className="mt-6 font-extrabold text-left">
                  <span
                    style={{
                      color: brand?.accentColor
                        ? brand?.accentColor
                        : '#1D4ED8',
                    }}
                    className="absolute inset-0"
                  />
                  {data.name}
                </h3>
                <p className="prose text-left text-gray-800 prose-base">
                  {data.description}
                </p>
                <Button item={data} collection={'Products'} />
              </span>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
