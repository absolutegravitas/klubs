import Link from 'next/link'

export function ExtraContentFiles({ link }: any) {
  return (
    <Link
      passHref
      key={link.item.id}
      className="px-6 py-2 text-center rounded-md cursor-pointer "
      href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${link.item.id}?download`}
      prefetch={false}
      download={link.item.title}
    >
      {/* <a download={link.item.title}> */}
        {/* <dt className="font-medium text-gray-900">{link.item.title}</dt>

        <dd className="mt-2 text-sm text-gray-500">
          <span className="font-semibold">Download</span>
          <span className="align-text-bottom material-symbols-outlined">
            file_download
          </span>
        </dd> */}
        <dt className="py-2">
          <div className="flex items-center space-x-4">
            {/* <div className="flex-shrink-0">
              <span className="align-text-bottom material-symbols-outlined">
                file_download
              </span>
            </div> */}
            <div className="flex-1 min-w-0">
              <p className="py-2 text-sm font-medium text-gray-900">
                {link.item.title}
              </p>
              <div className="rounded-xs inline-flex items-center border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50">
                <span className="align-text-bottom material-symbols-outlined">
                  file_download
                </span>{' '}
                Download
              </div>
              {/* <p className="text-sm text-gray-500 truncate">
              {'@' + person.handle}
            </p> */}
            </div>
          </div>
        </dt>
      {/* </a> */}
    </Link>
  )
}

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
