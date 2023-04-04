/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SwrBrand } from '@/lib/swr-helpers'
import LoginForm from '@/components/molecules/Auth/LoginForm'

export default function LoginModal({ redirect }: any) {
  const [open, setOpen] = useState(true)
  const brand: any = SwrBrand()

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
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-full">
                    <span
                      className="w-6 h-6 text-yellow-600 material-symbols-outlined"
                      aria-hidden="true"
                    >
                      login
                    </span>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Login
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You need to sign up to purchase this course. An account
                        allows you to access all your purchased courses,
                        programs and other exclusive materials.{' '}
                      </p>
                      <p className="pt-5 text-sm text-gray-500">
                        Magic links are a new secure way to sign-up / sign-in
                        without having to remember a password.
                      </p>
                    </div>
                  </div>
                </div>

                <LoginForm redirect={redirect} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
