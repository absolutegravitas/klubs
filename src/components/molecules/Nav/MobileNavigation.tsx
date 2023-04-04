import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MobileNavIcon,
  NavItems,
  SignInButton,
  AccountButton,
  SignOutButton,
} from '@/components/molecules'
import { NavLink } from '@/components/atoms'
import { useUser } from '@/lib/useUser';

export default function MobileNavigation({ data }: any) {
  // console.log('data->',data)
  const { user } = useUser()

  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }: any) => <MobileNavIcon open={open} data={data} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 flex flex-col p-4 mt-4 text-lg tracking-tight origin-top bg-white rounded-xs top-full text-slate-900 ring-1 ring-slate-900/5"
          >
            <NavItems data={data.header} />
            <hr className="m-2 border-slate-300/40" />
            {!user && <SignInButton className="" data={data} />}
            {user && (
              <>
                <AccountButton data={data} />
                <SignOutButton data={data} />
              </>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}
