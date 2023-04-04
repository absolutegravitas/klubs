import { ArrowRight as ArrowRightIcon } from '@/components/atoms/Icons'
import Link from 'next/link'
import { SwrBrand } from '@/lib/swr-helpers'

export default function ButtonGeneral({ id, item, color, collection }: any) {
  let coll = ''
  const brand: any = SwrBrand()

  switch (collection) {
    case 'Posts':
      coll = 'blog/'
      break
    case 'Products':
      coll = item.type + 's/'
      break
  }

  return (
    <div key={id} className="py-3 mt-3 sm:mt-0 sm:flex-shrink-0">
      <Link
      
        href={
          ((item.slug === 'home' || item.slug === '') && '/') ||
          (collection === 'CustomLinks' ? item.slug : '/' + coll + item.slug)
        }
        className="cursor-auto"
        passHref
      >
        <span
           style={{
            backgroundColor: brand?.accentColor
              ? brand?.accentColor
              : '#1D4ED8',
          }}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent shadow-xs rounded-xs hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"

          
        >
          <ArrowRightIcon className="w-6 h-6 mr-2 -ml-1" aria-hidden="true" />
          <span>{item.name}</span>
        </span>
      </Link>
    </div>
  )
}
