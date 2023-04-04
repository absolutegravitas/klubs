import cn from 'clsx'
import { Disclosure } from '@headlessui/react'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { Menu } from '@headlessui/react'
import { SwrBrand } from '@/lib/swr-helpers'

export function CourseMenu({ modules, setModule }: any) {
  // console.log('modules->', modules)
  const brand: any = SwrBrand()

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            Course Modules
            <span className="block w-6 h-6 material-symbols-outlined group-hover:text-gray-500">
              expand_more
            </span>
            {/* <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" /> */}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 leading-snug origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {modules &&
                modules.length > 0 &&
                modules.map((module: any) => (
                  <>
                    {module.item.content.length > 0 && (
                      <Disclosure
                        as="div"
                        key={module.item.id}
                        className="block px-4 py-2 text-sm leading-snug"
                      >
                        {({ open }) => (
                          <>
                            <h3>
                              <Disclosure.Button className="relative flex justify-between w-full text-left items-left group">
                                <span
                                  style={{
                                    color: brand?.accentColor
                                      ? brand?.accentColor
                                      : '#1D4ED8',
                                  }}
                                  className={cn(
                                    open ? '' : 'text-gray-900',
                                    'text-sm font-medium leading-snug'
                                  )}
                                >
                                  {module.item.name}
                                </span>
                                <span className="flex ml-6 items-left">
                                  {open ? (
                                    <span className="block w-5 h-5 p3-3 material-symbols-outlined group-hover:text-gray-500">
                                      remove
                                    </span>
                                  ) : (
                                    <span className="block w-5 h-5 pr-3 material-symbols-outlined group-hover:text-gray-500">
                                      add
                                    </span>
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-3">
                              <div className="space-y-3">
                                {module.item.content.map((subItem: any) => (
                                  <Menu.Item key={subItem.item.name}>
                                    <Disclosure.Button
                                      as="a"
                                      className="flex items-center w-full pl-1 text-xs font-normal text-gray-600 cursor-pointer rounded-xs group hover:bg-gray-50 hover:text-gray-900"
                                      onClick={(e: any) => {
                                        e.preventDefault()
                                        setModule(subItem.item)
                                      }}
                                    >
                                      {subItem.item.name}
                                    </Disclosure.Button>
                                  </Menu.Item>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
