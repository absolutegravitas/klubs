import cn from 'clsx'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { ProseGeneral } from '@/components/molecules'
import { ExtraContentLinks } from '../../molecules/CourseExtraContent/ExtraContentLinks'
import { ExtraContentFiles } from '../../molecules/CourseExtraContent/ExtraContentFiles'
import { SwrBrand } from '@/lib/swr-helpers'

export function ExtraContent({ data }: any) {
  // console.log('extracontent ->', data)
  const brand: any = SwrBrand()

  return (
    <>
      <div className=" font-display lg:col-span-3">
        {/* Product details */}
        <div className="mt-5 prose text-gray-500 prose-md font-display lg:mt-2">
          {data.desription ? data.description : 'No description available.'}
        </div>
        <section aria-labelledby="policies-heading" className="mt-10">
          <div className="w-full max-w-2xl mx-auto mt-16 lg:col-span-4 lg:mt-0 lg:max-w-none">
            <h3 className="text-lg font-medium leading-6 prose text-gray-900 prose-md">
              Additional Content
            </h3>
            {data.links.length === 0 ? (
              <>
                <p className="max-w-2xl prose text-gray-500 prose-md">
                  Bonus content, show notes and transcripts are located here.
                  Check back from time to time as we add more material to this
                  Course.
                  <p />
                  <span className="font-semibold ">
                    {` No additional content is available at this time.`}
                  </span>
                </p>
              </>
            ) : (
              <Tab.Group as="div">
                <div className="border-b border-gray-200">
                  <Tab.List className="flex -mb-px space-x-8">
                    <Tab
                      style={{
                        color: brand?.accentColor
                          ? brand?.accentColor
                          : '#1D4ED8',
                      }}
                      className={({ selected }: any) =>
                        cn(
                          selected
                            ? 'border-gray-600'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'prose-md prose whitespace-nowrap border-b-2 py-3 font-medium'
                        )
                      }
                    >
                      Files & Links
                    </Tab>
                    <Tab
                      style={{
                        color: brand?.accentColor
                          ? brand?.accentColor
                          : '#1D4ED8',
                      }}
                      className={({ selected }: any) =>
                        cn(
                          selected
                            ? 'border-gray-600 '
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'prose-md prose whitespace-nowrap border-b-2 py-3 font-medium'
                        )
                      }
                    >
                      Notes
                    </Tab>
                    <Tab
                      style={{
                        color: brand?.accentColor
                          ? brand?.accentColor
                          : '#1D4ED8',
                      }}
                      className={({ selected }: any) =>
                        cn(
                          selected
                            ? 'border-gray-600 '
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'prose-md prose whitespace-nowrap border-b-2 py-3 font-medium'
                        )
                      }
                    >
                      Transcript
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="-mb-10">
                    <dl className="block mt-5 space-y-4">
                      {data.links?.map((link: any) => {
                        return (
                          <>
                            {link.collection === 'directus_files' ? (
                              <ExtraContentFiles link={link} />
                            ) : (
                              <ExtraContentLinks link={link} />
                            )}
                          </>
                        )
                      })}
                    </dl>
                  </Tab.Panel>

                  <Tab.Panel className="pt-5">
                    <h3 className="sr-only">Notes</h3>

                    <div className="prose text-gray-500 prose-md max-w-none">
                      <ProseGeneral
                        content={
                          data?.notes ? data.notes : 'No notes available.'
                        }
                      ></ProseGeneral>
                    </div>
                    {/* {faqs.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 prose text-gray-500 prose-md max-w-none">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))} */}
                  </Tab.Panel>

                  <Tab.Panel className="pt-5">
                    <h3 className="sr-only">Transcript</h3>
                    <div className="prose text-gray-500 prose-md max-w-none">
                      <ProseGeneral
                        content={
                          data?.transcript && data.transcript != ''
                            ? data.transcript
                            : 'No transcript available.'
                        }
                      ></ProseGeneral>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
