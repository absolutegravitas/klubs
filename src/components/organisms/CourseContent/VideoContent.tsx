import { Video } from '@/components/atoms'

export function VideoContent({ data }: any) {
  // console.log('VideoContent ->', data)
  return (
    <>
      {data && data != '' ? (
        <div className="mt-8 lg:col-span-9 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <h2 className="sr-only">Video</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 lg:gap-8">
            <Video data={data}/>
          </div>
        </div>
      ) : (
        <div className="mt-8 lg:col-span-9 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 lg:gap-8">
            <h2 className="">Video not found.</h2>
          </div>
        </div>
      )}
    </>
  )
}
