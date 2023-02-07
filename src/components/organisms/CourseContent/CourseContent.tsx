import { ExtraContent } from '@/components/organisms/CourseContent/ExtraContent'
import { VideoContent } from '@/components/organisms/CourseContent/VideoContent'

export function CourseContent({ data }: any) {
  // expects passed in data for the currently selected module
// console.log('coursecontent->', data)
  return (
    <>
      <div className="max-w-2xl px-4 pb-10 mx-auto mt-8 sm:px-6 lg:max-w-7xl">
        {data ? (
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <>
              <VideoContent data={data.video} />
              <ExtraContent data={data} />
            </>
          </div>
        ) : (
          <div className="max-w-auto">
            <p className="text-2xl font-bold tracking-wide ">
              <span>Hi there, welcome to the course.</span>
            </p>

            <p className="mt-2 text-base text-gray-500">
              Select from one of the Course Modules to get started.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
