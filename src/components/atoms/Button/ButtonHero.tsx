import { ArrowRight as ArrowRightIcon } from '@/components/atoms/Icons'
import Link from 'next/link'

export default function ButtonHero({ id, item, colors, collection }: any) {
  // console.log(colors)
  let coll = ''

  switch (collection) {
    case 'Posts':
      coll = 'blog/'
      break
    case 'Products':
      coll = item.type + 's/'
      break
  }

  return (
    <div key={id} className="py-3 mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
      <Link
        href={
          ((item.slug === 'home' || item.slug === '') && '/') ||
          (collection === 'CustomLinks' ? item.slug : '/' + coll + item.slug)
        }
        passHref
        style={{
          backgroundColor: colors?.accentColor
            ? colors?.accentColor
            : '#1D4ED8',
        }}
        className={`rounded-xs shadow-xs focus:ring-primaryColor-800 relative inline-flex cursor-auto items-center border border-transparent px-4 py-5 text-lg font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2`}
      ><span>
        <ArrowRightIcon className="w-6 h-6 mr-2 -ml-1" aria-hidden="true" />
        <span>{item.name}</span></span>
      </Link>
    </div>
  )
}
