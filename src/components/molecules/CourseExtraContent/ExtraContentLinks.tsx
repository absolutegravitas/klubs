import Link from 'next/link'

export function ExtraContentLinks({ link }: any) {
  return (
    <Link
      className="p-6 text-center border border-gray-200 rounded-md bg-gray-50"
      key={link.item.id}
      passHref
      href={
        link.collection === 'Posts' ? `/blog/${link.item.slug}` : link.item.slug
      }
      prefetch={false}
    >
      {/* <a target="_blank" rel="noopener noreferrer"> */}
        {/* <dt className="font-medium text-gray-900">{link.item.name}</dt>
        <dd className="mt-2 text-sm text-gray-500">{link.item.description}</dd>
        <dd className="mt-2 text-sm text-gray-500">
          <span className="font-semibold">Visit</span>
          <span className="align-text-bottom material-symbols-outlined">
            arrow_outward
          </span>
        </dd> */}
        <dt className="py-2">
          <div className="flex items-center space-x-4">
            {/* <div className="flex-shrink-0">
              <span className="align-text-bottom material-symbols-outlined">
                arrow_outward
              </span>
            </div> */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {link.item.name}
              </p>
              <p className="text-sm text-gray-500">
                {link.item.description}
              </p>
              <div className="rounded-xs inline-flex items-center border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50">
            <span className="align-text-bottom material-symbols-outlined">
                arrow_outward
              </span> Visit
            </div>
            </div>
            
          </div>
        </dt>
      {/* </a> */}
    </Link>
  )
}
