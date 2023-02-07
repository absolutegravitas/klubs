import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { SwrBrand } from '@/lib/swr-helpers'
import { useUser } from '@supabase/supabase-auth-helpers/react'

export default function ExistingPurchase() {
  const router = useRouter()
  const brand: any = SwrBrand()
  const { user } = useUser()
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xs sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
                    <span
                      className="w-6 h-6 text-blue-600 material-symbols-outlined"
                      aria-hidden="true"
                    >
                      info
                    </span>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Existing purchase found
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`Heads up! Looks like you've already bought this course. Click the button below to access your purchases.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    style={{
                      backgroundColor: brand?.accentColor
                        ? brand?.accentColor
                        : '#1D4ED8',
                    }}
                    type="button"
                    className={`shadow-xs rounded-xs border-1 flex w-full cursor-pointer justify-center border  px-4  py-2 text-sm font-medium  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                    onClick={() => router.replace('/account')}
                  >
                    <span className="w-auto mr-3 align-middle material-symbols-outlined h-15">
                      location_away
                    </span>
                    Go to Account
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
