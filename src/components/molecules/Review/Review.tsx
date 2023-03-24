import dynamic from 'next/dynamic'
import Image from 'next/image'

const ProseGeneral = dynamic(
  () => import('@/components/molecules/Prose/ProseGeneral')
)
export default function Review({ data, colors }: any) {
  // console.log('Review->', data)
  let rating = +data.rating

  return (
    <>
      {data && (
        <>
          <div className="mb-12 md:mb-0">
            <div className="flex justify-center mb-6">
              {data.image && data.image !== '' ? (
                <Image
                  className="w-32 rounded-full shadow-xs"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                  // layout="responsive"
                  width={800}
                  height={800}
                  alt={data?.name || ''}
                  
                />
              ) : (
                <>
                  <Image
                    className="w-32 rounded-full shadow-xs"
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg"
                    // layout="responsive"
                    width={800}
                    height={800}
                    alt=""
                    
                  />
                </>
              )}
            </div>
            <h5 className="mb-4 text-xl font-semibold">
              {data.name ? data.name : `<Name Missing>`}
            </h5>
            <h6 className="mb-4 font-semibold text-blue-600">
              {data.role ? data.role : `<Role Missing>`}
            </h6>
            <p className="mb-4">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="quote-left"
                className="inline-block w-6 pr-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                />
              </svg>
              {data.description ? data.description : `<Description Missing>`}
            </p>
            <ul className="flex justify-center mb-0">
              <li>
                {
                  // for loop from 1 to 5
                  Array.from({ length: 5 }, (_, i) => {
                    if (i + 1 <= rating) {
                      return <FullStar key={i}/>
                    }
                  })
                }
              </li>
              <HalfStar rating={rating} />
            </ul>
          </div>
        </>
      )}
    </>
  )
}

const FullStar = () => {
  return (
    <>
      <span className="text-yellow-500 material-symbols-outlined">star</span>
    </>
  )
}

const HalfStar = (rating: any) => {
  const half = Math.ceil(rating % 1)

  return (
    <>
      {half != 0 && (
        <span className="text-yellow-500 material-symbols-outlined">
          star_half
        </span>
      )}
    </>
  )
}
