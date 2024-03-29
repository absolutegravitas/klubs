/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ProseHero } from '@/components/molecules'
const Button = dynamic(() => import('@/components/atoms/Button/ButtonHero'))

export default function HeroFullScreen({ data, colors }: any) {
  return (
    <>
      {data && (
        <div className="relative w-full h-screen overflow-hidden font-display">
          {/* <img
            src="https://images.unsplash.com/photo-1438109491414-7198515b166b?w=1800"
            className="absolute top-0 left-0 object-cover w-full h-full"
          /> */}

          {data.image && data.image !== '' ? (
            <Image
              className="absolute top-0 left-0 object-cover w-full h-full"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
              // layout="fill"
              width={1800}
              height={1600}
              alt={data?.section_name || ''}
              priority
            />
          ) : (
            <>
              <Image
                className="absolute top-0 left-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400"
                // layout="fill"
                width={1800}
                height={1600}
                alt=""
                priority
              />
            </>
          )}

          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-12 text-center">
            <div className="">
              {data.text && <ProseHero content={data.text} />}

              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8 ">
                {data.buttons?.map(({ id, item, collection }: any) => (
                  <Button key={id} item={item} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
